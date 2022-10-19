const express = require('express');
const mysql = require('mysql');
const homeRoute = require('./routes/home');

// express app
const app = express();

const port = 4001;
const hostname = "localhost";

//mysql db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "allan",
    database: "happytimes",
    charset: "utf8mb4_bin"
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("DB Connected!");
});

//create DB
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE happytimes";

    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send("Database created!");
    });
});

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));

app.use('/', homeRoute);
app.use('/about-us', homeRoute);
app.use('/products', homeRoute);
app.use('/blog', homeRoute);
app.use('/contact', homeRoute);
app.use('/createBlog', homeRoute);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
