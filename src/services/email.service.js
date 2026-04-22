// email.service.js
import nodemailer from "nodemailer";

let transporter;

export const initMailer = () => {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (to, message) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Order Notification",
    text: message,
  });

  console.log("📧 Email sent:", info.response);
};
