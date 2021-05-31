const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use('/web', express.static('/web/app','public'));


app.get("/", (req, res) => {
  res.redirect("/web/app/home");
});

app.get("/web/app/home", (req, res) => {
  res.render("pages/home2");
});

app.get("/web/app/resources/images", (req, res) => {
  res.render("pages/images");
});

app.get("/web/app/about", (req, res) => {
  res.render("pages/about");
});

app.get("/web/app/resources/local-case-study", (req, res) => {
  res.render("pages/local")
});

app.get("/web/app/resources/personal-case-study", (req, res) => {
  res.render("pages/personal")
});

app.listen(PORT, () => {
  console.log(chalk.bold.blue(`Server listening on port ${PORT}...`));
});
