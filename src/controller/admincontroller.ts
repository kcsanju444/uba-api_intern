import { Request, Response } from "express";
import { RequestHandler, ParamsDictionary } from "express";
import { ParsedQs } from "qs";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import con from "../graphql/db";

export const adminLogin = (req: Request, res: Response) => {
  const sql = "SELECT * FROM admin WHERE email = ?";
  con.query(sql, [req.body.email], (err, result: any[]) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });

    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }

        const token = jwt.sign(
          { role: user.role, email: user.email, id: user.id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true });
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  return res.json({ Status: true });
};
