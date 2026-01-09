"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const notesRoutes_js_1 = __importDefault(require("./routes/notesRoutes.js"));
const db_js_1 = require("./config/db.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rateLimiter_js_1 = __importDefault(require("./middleware/rateLimiter.js"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const favouriteRoutes_js_1 = __importDefault(require("./routes/favouriteRoutes.js"));
// console.log(process.env.MONGO_URI);
// const express = require("express");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// console.log(process.env.PORT)
//middleware
app.use((0, cors_1.default)({ origin: "https://note-app-client-u62u.vercel.app", credentials: true }));
app.use((0, cookie_parser_1.default)());
// app.use(express.json());
app.use(express_1.default.json({ limit: "5mb" }));
app.use("/api/uploads", express_1.default.static("uploads/"));
app.use(rateLimiter_js_1.default);
app.get("/", (req, res) => {
    res.send("you are in notes");
});
app.use((req, res, next) => {
    console.log(`Req method id ${req.method} & Req URL is ${req.url}`);
    next();
});
app.use("/api/notes", notesRoutes_js_1.default);
app.use("/api/auth", userRoutes_1.default);
app.use("/api/favourites", favouriteRoutes_js_1.default);
// app.post("/api/notes",(req,res) =>{
//     res.status(201).json({message:"post posted"});
// })
// //for example id hhtp://localhost:5050/api/notes/12345
// app.put("/api/notes/:id",(req,res) =>{
//     res.status(200).json({message:"post updated"});
// })
// app.delete("/api/notes/:id",(req,res) =>{
//     res.status(200).json({message:"post deleted"});
// })
(0, db_js_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT);
    });
});
//mongodb+srv://bhattaraideepesh07_db_user:OuVljY6ybO7wAD9J@cluster0.ncgvjkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
