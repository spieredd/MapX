require("dotenv").config();

const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 3000;

console.log("Starting...");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/web/app", express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/web/app/home");
});

app.get("/web/app/home", (req, res) => {
  res.render("pages/home");
});

app.get("/web/app/resources/images", (req, res) => {
  res.render("pages/images");
});

app.get("/web/app/about", (req, res) => {
  res.render("pages/about");
});

app.get("/web/app/contact", (req, res) => {
  res.render("pages/contact", { ok: false });
});

app.get("/web/app/resources/local-case-study", (req, res) => {
  res.render("pages/local");
});

app.get("/web/app/resources/personal-case-study", (req, res) => {
  res.render("pages/personal");
});

app.post("/web/app/contact", (req, res) => {
  console.log(req.body);
  res.render("pages/contact.ejs", { ok: true });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let professor = process.env.MAIL2

  let mailOptions = {
    from: process.env.MAIL,
    to: process.env.MAIL,professor,
    subject: `WW1 Map Project - Automatic Review Email`,
    html: `<div style="border-radius:5px;padding:20px;background-color:#4a1c40;color:#fff"><p style="color:#962d2d">This is an automatic email sent when a person leaves a review on our WW1 Class Project Website: </p> <h3>person (can be anonymous):${req.body.username}</h3><h2>Content of the message</h2><p>${req.body.review}</p><h3>Cordially,</h3><h3>Adrien DUMONT.</h3></div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(PORT, () => {
  console.log(chalk.bold.blue(`Server listening on port ${PORT}...`));
});
