const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// 🔹 Hardcode Your Gmail Credentials Here
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS; // Use an App Password, NOT your real Gmail password!



app.post("/send-email", async (req, res) => {
    const { name, email, description } = req.body;

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
        console.error("Error sending email:", error);  // Logs the actual error
        res.status(500).json({ message: "Email sending failed!", error: error.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
