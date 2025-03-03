import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signInJwt = (params) => {
  return jwt.sign(params, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};
export const hashPassword = async (password) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};