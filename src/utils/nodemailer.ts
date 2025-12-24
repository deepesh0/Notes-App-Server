import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  secure: true,
  auth: {
    user: "bhattaraideepesh07@gmail.com",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

interface IEmailOptions {
  to: string | string[];
  subject: string | string[];
  html: string;
  cc?: string | string[];
  attachments?: any;
  bcc?: string | string[];
}

export const sendEMail = async ({
  to,
  subject,
  html,
  cc,
  bcc,
  attachments,
}: IEmailOptions) => {
  try {
    const mailOptions: any = { to, html, subject };
    if (attachments) {
      mailOptions["attachments"] = attachments;
    }
    if (cc) {
      mailOptions["cc"] = cc;
    }
    if (bcc) {
      mailOptions["bcc"] = bcc;
    }
    await transporter.sendMail(mailOptions)
    console.log("Message sent:", sendEMail(mailOptions));

  } catch (error) {
    console.log("Failed to send Email", error);
  }
};
