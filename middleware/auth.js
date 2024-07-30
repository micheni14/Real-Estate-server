import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

    if (token && isCustomAuth) {
        const jwtsecret = process.env.LOGIN_SECRET;
        decodedData = jwt.verify(token, jwtsecret);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
  
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "No token or invalid token, authorization denied" });
    }
  };