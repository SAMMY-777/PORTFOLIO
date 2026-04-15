const sendEmail = require("../utils/sendEmail");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    await sendEmail(name, email, message);

    res.json({ message: "Email sent successfully ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
};