"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favlistSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User required']
    },
    note: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'note',
        required: [true, 'Note required']
    }
}, { timestamps: true });
const FavList = mongoose_1.default.model('favlist', favlistSchema);
exports.default = FavList;
