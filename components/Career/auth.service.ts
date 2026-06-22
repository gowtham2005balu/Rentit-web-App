import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    // Always store 10-digit mobile numbers in DB
    return digits.slice(-10);
  }

  getLocalNumber(phone: string): string {
    return phone;
  }

  // SEND OTP
  async sendOtp(mobile: string) {
    const phone = this.normalizePhone(mobile);
    const localNumber = this.getLocalNumber(phone);
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      if (process.env.FAST2SMS_API_KEY) {
        // Fast2SMS uses the bulkV2 endpoint to send OTPs
        const response = await axios.post(
          "https://www.fast2sms.com/dev/bulkV2",
          {
            variables_values: otp,
            route: "otp",
            numbers: localNumber,
          },
          {
            headers: {
              authorization: process.env.FAST2SMS_API_KEY,
              "Content-Type": "application/json",
            },
          },
        );

        console.log("FAST2SMS SEND:", response.data);

        if (!response.data.return) {
          throw new UnauthorizedException("OTP send failed: " + response.data.message);
        }
      } else {
        console.log(`[Mock SMS] Sending OTP ${otp} to ${localNumber}`);
      }

      // Clean up old sessions
      await this.prisma.otpSession.deleteMany({
        where: { mobile: phone },
      });

      // Save the generated OTP in the database (reusing your sessionId column to store the OTP)
      await this.prisma.otpSession.create({
        data: {
          mobile: phone,
          sessionId: otp, // Storing the generated OTP here for verification
        },
      });

      return {
        success: true,
        message: "OTP sent successfully",
        // Only return OTP in dev environment if you want to test without real SMS
        // otp: process.env.NODE_ENV === 'development' ? otp : undefined
      };
    } catch (e: any) {
      console.error(e.response?.data || e.message);
      throw new UnauthorizedException("Failed to send OTP");
    }
  }

  // VERIFY OTP
  async verifyOtp(mobile: string, otp: string) {
    const phone = this.normalizePhone(mobile);

    const session = await this.prisma.otpSession.findFirst({
      where: { mobile: phone },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!session) {
      throw new UnauthorizedException("OTP session not found");
    }

    // Verify the OTP directly against our stored session record
    if (session.sessionId !== otp) {
      throw new UnauthorizedException("Invalid OTP");
    }

    try {
      // OTP is valid! Delete the session so it can't be reused
      await this.prisma.otpSession.deleteMany({
        where: {
          mobile: phone,
        },
      });

      let user = await this.prisma.user.findUnique({
        where: {
          mobile: phone,
        },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            mobile: phone,
          },
        });
      }

      const token = this.jwtService.sign({
        userId: user.id,
        mobile: user.mobile,
      });

      return {
        success: true,
        token,
        user,
      };
    } catch (e: any) {
      console.error(e.response?.data || e.message);
      throw new UnauthorizedException("OTP verification failed");
    }
  }
}
