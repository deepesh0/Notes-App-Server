"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const error_handler_1 = __importDefault(require("../middleware/error.handler"));
const token = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, config_1.jwt_config.secret, { expiresIn: "5h" });
    }
    catch (error) {
        throw new error_handler_1.default("Token error", 400);
    }
};
exports.token = token;
const decode = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.jwt_config.secret);
    }
    catch (error) {
        console.log(error, "Invalid Token");
    }
};
exports.decode = decode;
