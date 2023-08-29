import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Usuarios";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { firstName, lastName, address, dob, dni, email, password } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      address,
      dob,
      dni,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
