const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/map", (req, res) => {
  res.render("map");
});

app.get("/images", (req, res) => {
  res.render("images");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log(chalk.bold.blue(`Server listening on port ${PORT}...`));
});
