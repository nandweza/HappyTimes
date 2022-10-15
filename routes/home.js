const router = require('express').Router();

//display the home page...
router.get('/', (req, res) => {
    res.render('index.ejs');
});

//display about page
router.get('/about-us', (req, res) => {
    res.render('about.ejs');
});

//display product page
router.get('/products', (req, res) => {
    res.render('products.ejs');
});

//display blog page
router.get('/blog', (req, res) => {
    res.render('blog.ejs');
});

//display contact page
router.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

module.exports = router;