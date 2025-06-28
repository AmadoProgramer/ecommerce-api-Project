import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "3283234830249340dsdw2je03923je32e92j3e02e3e32";

export class AuthService {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}
