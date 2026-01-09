"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//create a schema
//model based on that schema
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: {
            path: String,
            public_id: String
        }
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"],
    },
}, { timestamps: true }); //createdAt, updatedAT
const Note = mongoose_1.default.model("note", noteSchema);
exports.default = Note;
