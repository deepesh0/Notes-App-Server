"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesControllers_1 = require("../controllers/notesControllers");
const multer_1 = require("../middleware/multer");
const authenticate_1 = require("../middleware/authenticate");
const enum_1 = require("../@types/enum");
const router = express_1.default.Router();
const upload = (0, multer_1.uploadFile)();
router.get("/", notesControllers_1.getAllNotes);
router.get("/:id", notesControllers_1.getNotebyId);
router.post("/", upload.single("photo"), (0, authenticate_1.authenticate)([enum_1.Role.USER]), notesControllers_1.createNote);
router.put("/:id", notesControllers_1.updateNote);
router.delete("/:id", notesControllers_1.deleteNote);
exports.default = router;
