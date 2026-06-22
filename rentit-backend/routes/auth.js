const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

// POST /auth/send-otp (Handles both Signup and Login)
router.post('/send-otp', async (req, res) => {
    try {
        const { mobile } = req.body;
        if (!mobile) return res.status(400).json({ error: "Mobile number is required" });

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const { rows } = await pool.query('SELECT * FROM "User" WHERE mobile = $1', [mobile]);
        
        if (rows.length === 0) {
            // New User Signup
            await pool.query('INSERT INTO "User" (mobile, otp) VALUES ($1, $2)', [mobile, otp]);
        } else {
            // Existing User Login
            await pool.query('UPDATE "User" SET otp = $1 WHERE mobile = $2', [otp, mobile]);
        }
        
        // Attempt to send real SMS if API key is provided
        if (process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_API_KEY !== "") {
            const url = 'https://www.fast2sms.com/dev/bulkV2';
            const bodyParams = new URLSearchParams({
                variables_values: otp,
                route: 'otp',
                numbers: mobile
            });

            // Need to use dynamic import for node-fetch if using commonjs, or use global fetch if Node >= 18
            const fetch = global.fetch || require('node-fetch');
            const smsResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'authorization': process.env.FAST2SMS_API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyParams.toString()
            });
            
            const smsData = await smsResponse.json();
            console.log(`[Real SMS] Fast2SMS Response for ${mobile}:`, smsData);
        } else {
            console.log('---------------------------------');
            console.log(`[Mock SMS] OTP for ${mobile} is: ${otp}`);
            console.log('---------------------------------');
        }
        
        res.status(200).json({ 
            message: "OTP sent successfully",
            otp: process.env.NODE_ENV === 'development' ? otp : undefined // only send back in dev
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP", details: error.message });
    }
});

// POST /auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    try {
        const { mobile, otp } = req.body;
        
        const { rows } = await pool.query('SELECT * FROM "User" WHERE mobile = $1', [mobile]);
        const user = rows[0];
        
        if (!user) return res.status(404).json({ error: "User not found" });
        
        if (user.otp === otp) {
            await pool.query('UPDATE "User" SET "isProfileComplete" = true, otp = null WHERE id = $1', [user.id]);
            
            // Generate JWT Token for Authentication
            const token = jwt.sign(
                { userId: user.id, mobile: user.mobile },
                process.env.JWT_SECRET || 'fallback_secret_key',
                { expiresIn: '30d' }
            );
            
            res.status(200).json({ 
                message: "OTP Verified, Login successful", 
                token: token,
                userId: user.id,
                isNewUser: !user.name // If no name, they are a new user
            });
        } else {
            res.status(400).json({ error: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ error: "OTP verification failed", details: error.message });
    }
});

// POST /auth/profile
router.post('/profile', async (req, res) => {
    try {
        const { userId, name, email, city } = req.body;
        
        const { rowCount } = await pool.query(
            'UPDATE "User" SET name = $1, email = $2, city = $3 WHERE id = $4',
            [name, email, city, userId]
        );
        
        if (rowCount === 0) return res.status(404).json({ error: "User not found" });
        
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update profile", details: error.message });
    }
});

module.exports = router;
