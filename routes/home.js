const router = require('express').Router();

//get the home page...
router.get('/', (req, res) => {
    res.render('index.ejs');
});

//get about page
router.get('/about-us', (req, res) => {
    res.render('about.ejs');
});

//get product page
router.get('/products', (req, res) => {
    res.render('products.ejs');
});

//get blog page
router.get('/blog', (req, res) => {
    res.render('blog.ejs');
});

//get create blog page
router.get('/createBlog', (req, res) => {
    res.render('createBlog.ejs');
});

//get contact page
router.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

module.exports = router;