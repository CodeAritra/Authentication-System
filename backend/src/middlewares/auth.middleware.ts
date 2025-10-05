import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.auth_cookie;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "very_secret");

    req.user = decoded;
    next();
  } catch (err: any) {
    console.error("JWT error:", err.message);
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
