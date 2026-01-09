"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../@types/enum");
exports.UserSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    profile_image: {
        required: [true, "Profile Required"],
        type: {
            path: String,
            public_id: String,
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: Object.values(enum_1.Role),
        default: enum_1.Role.USER
    }
}, { timestamps: true });
const User = mongoose_1.default.model('user', exports.UserSchema);
exports.default = User;
