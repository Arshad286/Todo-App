import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";

//Create Account
export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, hashedPassword } = req.body;

    if (!firstName || !lastName || !email || !hashedPassword) {
      return res.status(400).json({
        error: true,
        message: "All Fields are required",
      });
    }

    //Check if user already exist
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exist",
      });
    }

    const gethashedPassword = await bcrypt.hash(hashedPassword, 10);

    //Create a new user
    const newuser = new User({
      firstName,
      lastName,
      email,
      hashedPassword: gethashedPassword,
    });

    await newuser.save();

    const accessToken = jwt.sign(
      {
        user: newuser,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600m",
      }
    );

    return res.status(201).json({
      error: false,
      user: {
        id: newuser.id,
        firstName: newuser.firstName,
        lastName: newuser.lastName,
        email: newuser.email,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Intenal server error",
    });
  }
};
