import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const JWT = process.env.JWT_SECRET as string

interface DecodedUser {
    id: string
    email: string
    iat: number
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token Invalid" });
    }

    req.user = decoded as DecodedUser;

    console.log("Authenticated user:", req.user);

    next();
  });
};
