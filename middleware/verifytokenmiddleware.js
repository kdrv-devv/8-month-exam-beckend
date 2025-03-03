import jwt from "jsonwebtoken";
import { CustomError } from "../errors/index.js";

const verifyMiddlewere = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new CustomError(404, "Accses token not defined");
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, encode) => {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new CustomError(403, "Token  Invalid");
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new CustomError(
          403,
          "Token expired. Please login again to get a new token"
        );
      }
      req.userId = encode.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};
export { verifyMiddlewere };
