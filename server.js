const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/web/app', express.static('public'));


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

app.get("/web/app/contact", (req, res) => {
  res.render("pages/contact", { ok: false });
});

app.get("/web/app/resources/local-case-study", (req, res) => {
  res.render("pages/local")
});

app.get("/web/app/resources/personal-case-study", (req, res) => {
  res.render("pages/personal")
});

app.post('/web/app/contact/review', (req, res) => {
  console.log(req.body.review);
  res.render('pages/contact.ejs', { ok: true });
})

app.listen(PORT, () => {
  console.log(chalk.bold.blue(`Server listening on port ${PORT}...`));
});
