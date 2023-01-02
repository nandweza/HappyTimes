const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Product = require("../models/products");
const Service = require("../models/services");
const bcrypt = require("bcrypt");
const isEmpty = require("is-empty");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const images = [{image:"../public/images/happy.jpg"}];
const imageb = [{image:"../public/images/blog.jpg"}]

let posts = [];

const Storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: Storage }).single('blogimg');

//get the home page
router.get('/', (req, res) => {
    res.render('index', {images: images});
});

//get about page
router.get('/about-us', (req, res) => {
    res.render('about');
});

//get product page
router.get('/products', async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    const services = await Service.find();
    res.render("products", { products: products, services: services });
});

//get addProducts by admin
router.get('/addProducts', (req, res) => {
    res.render('addProducts');
})

//add products
router.post("/products", upload, (req, res) => {
    const { desc } = req.body;
    const blogimg = req.file.filename;
    

    if (!blogimg || !desc) {
        return res.redirect("/products");
    }

    const products = new Product({ blogimg, desc });

    products
        .save()
        .then(() => {
            console.log("product created!!!");
            res.redirect('/admin');
        })
        .catch ((err) => console.log(err));
});

//get all products by admin
router.get("/allProducts", async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render("allProducts", { products: products });
});

//delete a product
router.post('/deleteProduct', (req, res) => {
    const deletedItemId = req.body.deleteBtn;

    Product.findByIdAndDelete(deletedItemId, (err) => {
        if (!err) {
            console.log("deletion success!");
            res.redirect("/allProducts");
        } else {
            console.log(err);
        }
    });
});

//add a service
router.post("/service", (req, res) => {
    const { title, desc } = req.body;

    if (!desc) {
        return res.redirect("/service");
    }

    const services = new Service({ title, desc });

    services
        .save()
        .then(() => {
            console.log("service created!!!");
            res.redirect('/admin');
        })
        .catch ((err) => console.log(err));
});

//get service by admin
router.get("/service", async (req, res) => {
    const services = await Service.find();
    res.render("service", { services: services });
});

//delete a service
router.post('/deleteService', (req, res) => {
    const deletedItemId = req.body.deleteBtn;

    Service.findByIdAndDelete(deletedItemId, (err) => {
        if (!err) {
            console.log("deletion success!");
            res.redirect("/service");
        } else {
            console.log(err);
        }
    });
});

//get blog page
router.get('/blog', async (req, res) => {
    posts = await Post.find().sort({createdAt: -1});
    res.render('blog', {imageb: imageb, posts: posts});
});

//get create blog page
router.get('/createPost', (req, res) => {
    res.render('createPost');
});

//get all posts by admin
router.get('/allPosts', async (req, res) => {
    posts = await Post.find().sort({ createdAt: -1});
    res.render('allPosts', {posts: posts});
});

//create blog post
router.post("/createPost", upload, (req, res) => {
    const { blogtitle, blogcontent } = req.body;
    const blogimg = req.file.filename;
    

    if (!blogtitle || !blogcontent) {
        return res.redirect("/createPost");
    }

    const posts = new Post({ blogtitle, blogcontent, blogimg });

    posts
        .save()
        .then(() => {
            console.log("Article created!!!");
            res.redirect('/admin');
        })
        .catch ((err) => console.log(err));
    });

//get single blog post
router.get("/posts", async (req, res) => {
    //const blog_id = req.params.id
    const comments = Comment.find().sort({ createdAt: -1 });
    posts = await Post.findOne();
    isEmpty(posts) ? res.redirect('/') : res.render("posts", { posts: posts, comments: comments });
});


//get edit page
router.get('/edit', (req, res) => {
    res.render('edit');
})

//update blog
router.post('/edit', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete blog post
router.post('/delete', (req, res) => {
    const deletedItemId = req.body.deleteBtn;

    Post.findByIdAndDelete(deletedItemId, (err) => {
        if (!err) {
            console.log("deletion success!");
            res.redirect("/allPosts");
        } else {
            console.log(err);
        }
    });
});

//post comment
router.post('/postcomments', (req, res) => {
    const postComments = req.body;

    const comments = new Comment({ postComments });

    comments
        .save()
        .then(() => {
            console.log("comment posted successfully");
            res.redirect('/posts');
        })
        .catch ((err) => console.log(err));
});

//get contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});

//login page
router.get('/login', (req, res) => {
    res.render('login');
});

// register user
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const newUser = new User({
        username: req.body.username,
        password: (await bcrypt.hash(req.body.password, salt)),
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//login user
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return res.redirect('/admin');
        //console.log("login successfully");
        //res.status(200).json({ message: "Valid password" });
      } else {
        res.redirect("/login");
        //res.status(400).json({ error: "Invalid Password" });
      }
    }
  });
        
// admin page
router.get("/admin", (req, res) => {
    res.render("admin");
});

//logout admin
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;