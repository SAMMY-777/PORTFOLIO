const nodemailer = require("nodemailer");

const sendEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Message",
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `
  });
};

module.exports = sendEmail;