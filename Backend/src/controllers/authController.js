import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

function createToken(userId) {
  return jwt.sign(
    {
      id: userId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

export async function register(
  req,
  res
) {
  try {
    const {
      name,
      email,
      password,
      phone
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required."
      });
    }

    const existing =
      await User.findOne({ email });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Email already registered."
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    const token =
      createToken(user._id);

    res.status(201).json({
      success: true,
      message:
        "Account created successfully.",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function login(
  req,
  res
) {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email })
        .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password."
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password."
      });
    }

    const token =
      createToken(user._id);

    res.json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}