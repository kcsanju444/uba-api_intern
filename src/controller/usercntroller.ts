import { Request, Response } from "express";
import crypto from "crypto";
import { createUser, getUserByEmail } from "../db/users";

export default class RegisterController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Generate salt and hashed password without helper
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex");

      const user = await createUser({
        email,
        username,
        authentication: {
          salt,
          password: hash,
        },
      });

      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async findAll(req: Request, res: Response) {
    return res.status(200).json({ message: "findAll OK" });
  }

  async findOne(req: Request, res: Response) {
    return res.status(200).json({ message: "findOne OK", id: req.params.id });
  }

  async update(req: Request, res: Response) {
    return res.status(200).json({
      message: "update OK",
      id: req.params.id,
      data: req.body,
    });
  }

  async delete(req: Request, res: Response) {
    return res.status(200).json({ message: "delete OK", id: req.params.id });
  }
}
