"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favourite_controllers_1 = require("../controllers/favourite.controllers");
const authenticate_1 = require("../middleware/authenticate");
const enum_1 = require("../@types/enum");
const router = express_1.default.Router();
router.post("/", (0, authenticate_1.authenticate)([enum_1.Role.USER]), favourite_controllers_1.create);
router.get("/", (0, authenticate_1.authenticate)([enum_1.Role.USER]), favourite_controllers_1.getAll);
router.delete("/", (0, authenticate_1.authenticate)([enum_1.Role.USER]), favourite_controllers_1.clearAll);
exports.default = router;
