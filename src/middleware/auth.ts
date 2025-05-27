import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ Status: false, Error: "Not Authenticated" });

  jwt.verify(
    token,
    "jwt_secret_key",
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.status(403).json({ Status: false, Error: "Invalid Token" });

      // If decoded is a string, you might want to handle that case separately
      if (typeof decoded === "object" && decoded !== null) {
        req.user = decoded as TokenPayload;
      } else {
        return res.status(403).json({ Status: false, Error: "Invalid Token Payload" });
      }
      next();
    }
  );
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ Status: false, Error: "Access Denied" });
  }
  next();
};
