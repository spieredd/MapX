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

app.get("/web/app/images", (req, res) => {
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
  let username = "";

  if (!req.body.username) {
    username = "anonymous";
  } else {
    username = req.body.username;
  }

  let mailList = [
    process.env.MAIL,
    process.env.MAILB
  ]

  let mailOptions = {
    from: process.env.MAIL,
    to: mailList,
    subject: `WW1 Map Project - Automatic Review Email`,
    html: `<p>Automatic Email sent from the server behind our Class Map Project<p>This is a review that a user has sent on the website through the contact page:</p><hr><p><span style="font-weight:bold">Sender:</span> ${username}</p><hr><p style="font-weight:bold">Review content:</p><p style="font-style:italic">${req.body.review}</p>`,
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
