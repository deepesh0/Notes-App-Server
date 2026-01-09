"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bycrypt_1 = require("../utils/bycrypt");
const jwt_1 = require("../utils/jwt");
const cloudinary_1 = require("../utils/cloudinary");
const nodemailer_1 = require("../utils/nodemailer");
const error_handler_1 = __importDefault(require("../middleware/error.handler"));
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const profile_image = req.file;
        if (!first_name || !last_name || !email || !profile_image) {
            return res.status(400).json({ message: "All fields required" });
        }
        const user = new user_model_1.default({ first_name, last_name, email, profile_image });
        const hashedPass = await (0, bycrypt_1.hashPassword)(password);
        user.password = hashedPass;
        if (profile_image) {
            const { secure_url, public_id } = (await (0, cloudinary_1.upload)(profile_image.path, "/profile_images"));
            user.profile_image = {
                path: secure_url,
                public_id,
            };
            await user.save();
        }
        return res.status(200).json({ message: "Profile Created", data: user });
    }
    catch (error) {
        throw new error_handler_1.default("Cannot create Profile", 401);
    }
};
exports.register = register;
//havent passed role why?
//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter both Email & Password" });
        }
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new error_handler_1.default("User not found", 400);
        }
        const isPassMatch = await (0, bycrypt_1.comparePassword)(password, user.password);
        if (!isPassMatch) {
            return res.status(400).json({ message: "Credentials do not match" });
        }
        const access_token = (0, jwt_1.token)({
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            Role: user.role,
        });
        (0, nodemailer_1.sendEMail)({
            html: "<h1>Login Successful</h1>",
            subject: "Login to account",
            to: user.email,
        });
        return res
            .cookie("access_token", access_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "development" ? false : true,
            maxAge: Number(process.env.COOKIE_EXPIRES_IN || "7") * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({ message: "Login Successful", token: access_token });
    }
    catch (error) {
        throw new error_handler_1.default("cannot login", 500);
    }
};
exports.login = login;
//change password
const changePass = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new error_handler_1.default("User not found", 400);
        }
        const newPass = await (0, bycrypt_1.hashPassword)(password);
        user.password = newPass;
        res.status(200).json({ message: "Password Updated", status: "success" });
    }
    catch (error) {
        throw new error_handler_1.default("Issue changing Password", 500);
    }
};
const me = async (req, res) => {
    try {
        // const id = req.user?._id;
        // const user = await User.findOne({ _id: id });
        const user = await user_model_1.default.findById(req.user?._id);
        res.status(200).json({
            data: user,
            message: "Profile fetched",
        });
    }
    catch (error) {
        throw new error_handler_1.default("issue at me", 500);
    }
};
exports.me = me;
const logout = async (req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "development" ? false : true,
            path: "/"
        });
        res.status(200)
            .json({
            data: null,
            message: "Logout successfull",
        });
    }
    catch (error) {
        throw new error_handler_1.default("Logout failed", 500);
    }
};
exports.logout = logout;
