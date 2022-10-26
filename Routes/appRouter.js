const express = require('express');
const router = express.Router();
const Blog = require("../models/blog");

//get the home page
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

//create blog post
router.post("/createBlog", async (req, res) => {
    const newBlog = new Blog(req.body);

    try {
        const savedBlog = await newBlog.save();
        res.status(201).json("Blog created!!!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//update blog
router.put('/createBlog/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete blog
router.delete('/createBlog/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog deleted successfully!!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all blogs
router.get("/allblogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

//find a blog by id
router.get('/allBlogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get contact page
router.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

module.exports = router;