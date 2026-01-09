"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAll = exports.getAll = exports.create = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const error_handler_1 = __importDefault(require("../middleware/error.handler"));
const favourite_1 = __importDefault(require("../models/favourite"));
const create = async (req, res, next) => {
    const { note_id } = req.body;
    const user_id = req.user?._id;
    let favlist = null;
    try {
        const note = await Note_1.default.findOne({ _id: note_id });
        if (!note) {
            throw new error_handler_1.default("Note not Found", 404);
        }
        const is_exists = await favourite_1.default.findOne({ user: user_id, note: note_id });
        if (is_exists) {
            await is_exists.deleteOne();
        }
        else {
            favlist = await favourite_1.default.create({ user: user_id, note: note_id });
        }
        res.status(200).json({
            message: is_exists ? "Note removed" : "Note Added",
            data: favlist,
            status: "success",
        });
    }
    catch (error) {
        console.log(error);
        throw new error_handler_1.default("Failed to create favourite list", 400);
    }
};
exports.create = create;
const getAll = async (req, res, next) => {
    const user_id = req.user?._id;
    try {
        const list = await favourite_1.default.find({ user: user_id }).populate('user').populate('note');
        res.status(200).json({
            message: "Your wishlist",
            data: list,
            status: "success",
        });
    }
    catch (error) {
        throw new error_handler_1.default("List not found", 400);
    }
};
exports.getAll = getAll;
const clearAll = async (req, res, next) => {
    const user_id = req.user?._id;
    try {
        const list = await favourite_1.default.deleteMany({ user: user_id });
        res.status(200).json({
            message: "Your wishlist is empty",
            status: "success",
        });
    }
    catch (error) {
        throw new error_handler_1.default("List not found", 400);
    }
};
exports.clearAll = clearAll;
