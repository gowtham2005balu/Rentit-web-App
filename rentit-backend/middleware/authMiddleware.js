const jwt = require('jsonwebtoken');

// Middleware to protect routes that require a logged-in user
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // The header is usually in the format: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
        
        // Add the decoded payload ({ userId, mobile }) to the request object
        req.user = verified; 
        
        // Proceed to the next middleware or route handler
        next(); 
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticateToken;
