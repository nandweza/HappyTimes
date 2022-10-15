const express = require('express');
const homeRoute = require('./routes/home'); 

// express app
const app = express();

const port = 4000;
const hostname = "localhost";

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));

app.use('/', homeRoute);
app.use('/about-us', homeRoute);
app.use('/products', homeRoute);
app.use('/blog', homeRoute);
app.use('/contact', homeRoute);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});