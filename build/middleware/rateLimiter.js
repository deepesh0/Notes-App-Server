"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upstash_js_1 = __importDefault(require("../config/upstash.js")); // Correct relative path
const rateLimiter = async (req, res, next) => {
    try {
        const ip = req.ip ||
            req.headers["x-forwarded-for"] ||
            "anonymous";
        const { success } = await upstash_js_1.default.limit(ip);
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            });
        }
        next();
    }
    catch (error) {
        console.error("Rate limit error:", error);
        next(error);
    }
};
exports.default = rateLimiter;
