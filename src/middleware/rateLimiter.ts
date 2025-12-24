import ratelimit from "../config/upstash.js";  // Correct relative path
import { Request, Response } from 'express';
import { NextFunction } from 'express';

const rateLimiter = async (req:Request, res:Response, next:NextFunction) => {
  try {
        const ip =
      req.ip ||
      (req.headers["x-forwarded-for"] as string) ||
      "anonymous";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later"
      });
    }

    next();  
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error); 
  }
};
export default rateLimiter;

