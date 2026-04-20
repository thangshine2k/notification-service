import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, message) => {
  const mailOptions = {
    from: "thangthontien2k@gmail.com",
    to,
    subject: "Order Notification",
    text: message,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("📧 Email sent:", info.response);
};