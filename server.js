const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use Render's Assigned Port
const PORT = process.env.PORT || 5000;

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, "client", "build")));

// ✅ Root Route (Prevents Render from Failing)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// ✅ Health Check Route (Important for Render)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Load Gmail Credentials
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

app.post("/send-email", async (req, res) => {
  const { name, email, description } = req.body;

  if (!GMAIL_USER || !GMAIL_PASS) {
    return res.status(500).json({ message: "Email configuration missing!" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: GMAIL_USER,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Email sending failed!", error: error.message });
  }
});

// 🌐 Start Server with Correct Port
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
