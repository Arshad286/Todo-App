import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const createAccessToken = async (req, res) => {
  try {
    const { email, hashedPassword } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!hashedPassword) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Find user by email
    const userInfo = await User.findOne({ email });

    // Check if user exists
    if (!userInfo) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      hashedPassword,
      userInfo.hashedPassword
    );

    if (!passwordMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      { user: userInfo },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      error: false,
      message: "Login Successful",
      email: userInfo.email,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
