import jwt, { JwtPayload } from "jsonwebtoken";

import { Iplayload } from "../@types/interface.types";
import { jwt_config } from "../config/config";
import CustomError from "../middleware/error.handler";
export const token = (payload: Iplayload) => {
  try {
    return jwt.sign(payload, jwt_config.secret, { expiresIn: "5h" }) as any
  } catch (error) {
    throw new CustomError("Token error",400);
    
  }
};

export const decode = (token: string) => {
  try {
    return jwt.verify(token, jwt_config.secret) as JwtPayload
  } catch (error) {
    console.log(error, "Invalid Token");
  }
};
