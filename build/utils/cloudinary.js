"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const upload = async (file, dir) => {
    try {
        const folder = "/Notes app" + dir;
        const { secure_url, public_id } = await cloudinary_config_1.default.uploader.upload(file, {
            folder,
            unique_filename: true,
        });
        if (fs_1.default.existsSync(file)) {
            fs_1.default.unlinkSync(file);
        }
        return {
            secure_url,
            public_id
        };
    }
    catch (error) {
        console.log(error, "Image Upload Error");
    }
};
exports.upload = upload;
