const express = require('express');
const router = express.Router();
const Blog = require("../models/blog");

//login page
router.get('/login', (req, res) => {
    res.render('login');
});

//get the home page
router.get('/', (req, res) => {
    res.render('index');
});

//get about page
router.get('/about-us', (req, res) => {
    res.render('about');
});

//get product page
router.get('/products', (req, res) => {
    res.render('products');
});

//get blog page
router.get('/blog', (req, res) => {
    res.render('blog');
});

//get create blog page
router.get('/createBlog', (req, res) => {
    res.render('createBlog');
});

//get all blogs page
router.get('/allBlogs', (req, res) => {
    res.render('allBlogs');
});


//create blog post
router.post("/createBlog", (req, res) => {
    const { title, img, content} = req.body;

    if (!title || !content) {
        return res.redirect("/createBlog");
    }

    const newBlog = new Blog({ title, img, content });

    newBlog
        .save()
        .then(() => {
            console.log("Blog created!!!");
            res.redirect('/allBlogs');
        })
        .catch ((err) => console.log(err));
    });
//router.post("/createBlog", async(req, res) => {
//    const title = req.body.blogTitle;
//    const  img = req.body.blogImage;
//    const  body = req.body.blogBody;
//  
//    if (title !== "" && description !== "") {
//		posts = new blogPost({
//			blogtitle: req.body.blogTitle,
//            blogimg: req.body.blogImage,
//			blogbody: req.body.blogBody,
//		});
//		await posts.save();
//		res.redirect(`/blog/${posts.blogtitle}`);
//	}
//	else {
//		res.render("createBlog", { title: title, img: img, body: body });
//	}
//  });

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
router.get("/allBlogs", async (req, res) => {
    const allblogs = await Blog.find();
    res.render("allBlogs", { blogs: allblogs });
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
    res.render('contact');
});

module.exports = router;