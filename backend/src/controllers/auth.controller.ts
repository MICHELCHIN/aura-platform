import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/user.model.js";

export const register = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      res.status(400).json({ message: "El email ya está registrado" });
      return;
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = await createUser(full_name, email, password_hash);
    res.status(201).json({ message: "Usuario creado", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env["JWT_SECRET"] as string,
      { expiresIn: "7d" }
    );
    res.json({ token, user: { id: user.id, email: user.email, full_name: user.full_name } });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};