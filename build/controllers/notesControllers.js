"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = getAllNotes;
exports.getNotebyId = getNotebyId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
const Note_js_1 = __importDefault(require("../models/Note.js"));
const cloudinary_1 = require("../utils/cloudinary");
async function getAllNotes(req, res) {
    try {
        const notes = await Note_js_1.default.find().populate("user").sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error occured");
        res.status(500).json({ message: "server error}" });
    }
}
async function getNotebyId(req, res) {
    try {
        const note = await Note_js_1.default.findById(req.params.id).populate("user");
        if (!note)
            return res.status(404).json({ message: "Note not found" });
        res.json(note);
    }
    catch (error) {
        console.error("Error occured in getNotebyId");
        res.status(500).json({ message: "server error}" });
    }
}
async function createNote(req, res) {
    try {
        const user_id = req.user?._id;
        console.log(user_id);
        const { title, content } = req.body;
        const photo = req.file;
        const note = new Note_js_1.default({ title: title, content: content, photo: photo, user: user_id });
        const savedNote = await note.save();
        if (photo) {
            const { secure_url, public_id } = (await (0, cloudinary_1.upload)(photo.path, "/notes_photos"));
            note.photo = {
                path: secure_url,
                public_id
            };
        }
        await note.save();
        res.status(201).json(savedNote);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error}" });
    }
}
async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note_js_1.default.findByIdAndUpdate(id, { title: title, content: content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "note not found" });
        }
        res.status(200).json(updatedNote);
    }
    catch (error) {
        console.error("Error occured", error);
        res.status(500).json({ message: "server error" });
    }
}
async function deleteNote(req, res) {
    try {
        const deleteNote = await Note_js_1.default.findByIdAndDelete(req.params.id);
        if (!deleteNote)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
