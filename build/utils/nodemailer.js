"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEMail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
        user: "bhattaraideepesh07@gmail.com",
        pass: "jn7jnAPss4f63QBp6D",
    },
});
const sendEMail = async ({ to, subject, html, cc, bcc, attachments, }) => {
    try {
        const mailOptions = { to, html, subject };
        if (attachments) {
            mailOptions["attachments"] = attachments;
        }
        if (cc) {
            mailOptions["cc"] = cc;
        }
        if (bcc) {
            mailOptions["bcc"] = bcc;
        }
        await exports.transporter.sendMail(mailOptions);
        console.log("Message sent:", (0, exports.sendEMail)(mailOptions));
    }
    catch (error) {
        console.log("Failed to send Email", error);
    }
};
exports.sendEMail = sendEMail;
