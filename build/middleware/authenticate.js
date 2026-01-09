"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const error_handler_1 = __importDefault(require("./error.handler"));
const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            const cookie = req.cookies ?? {};
            const token = cookie["access_token"];
            console.log('token', token);
            console.log("access_token", token);
            if (!token) {
                throw new error_handler_1.default("Forbidden. Access Denied", 403);
            }
            const decodedData = (0, jwt_1.decode)(token);
            console.log(decodedData);
            if (!decodedData) {
                throw new error_handler_1.default("Forbidden. Access Denied", 403);
            }
            if (decodedData?.exp && decodedData?.exp * 1000 < Date.now()) {
                res.clearCookie("access_token", {
                    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "development" ? false : true,
                    maxAge: Date.now(),
                });
                throw new error_handler_1.default("Forbidden. Access Denied", 403);
            }
            const user = await user_model_1.default.findOne({
                _id: decodedData?._id,
                email: decodedData?.email,
            });
            // console.log(user)
            if (!user) {
                res.clearCookie("access_token", {
                    sameSite: "lax",
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "development" ? false : true,
                    maxAge: Date.now(),
                });
                throw new error_handler_1.default("Forbidden. Access Denied", 403);
            }
            if (roles && roles.length > 0 && !roles.includes(user.role)) {
                throw new error_handler_1.default("Forbidden. Access Denied", 403);
            }
            req.user = {
                _id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                Role: user.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
