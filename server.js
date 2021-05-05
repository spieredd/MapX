const express = require('express');
const chalk = require('chalk');
const ejs = require('ejs');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/map', (req, res) => {
    res.render('map');
});

app.listen(PORT, () => {
    console.log(chalk.bold.blue(`Server listening on port ${PORT}...`));
});