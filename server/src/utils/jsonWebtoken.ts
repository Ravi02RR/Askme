import jwt, { JwtPayload } from "jsonwebtoken";

interface Data {
  username: string;
}

export const createToken = (data: Data): string => {
  const secret = process.env.JWT;
  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables.");
  }
  const token = jwt.sign(data, secret);
  return token;
};

export const verifyToken = (token: string): string | JwtPayload => {
  const secret = process.env.JWT;
  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables.");
  }
  try {
    const decodedData = jwt.verify(token, secret);
    return decodedData;
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};
