"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const user_authentication_1 = require("../controllers/user.authentication");
const authenticate_1 = require("../middleware/authenticate");
const enum_1 = require("../@types/enum");
const router = express_1.default.Router();
const upload = (0, multer_1.uploadFile)();
router.post("/register", upload.single("profile_image"), user_authentication_1.register);
router.post("/login", user_authentication_1.login);
router.post("/logout", user_authentication_1.logout);
router.get("/me", (0, authenticate_1.authenticate)([enum_1.Role.ADMIN, enum_1.Role.USER]), user_authentication_1.me);
exports.default = router;
