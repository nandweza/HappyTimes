const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const isEmpty = require("is-empty");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const images = [{image:"../public/images/happy.jpg"}];
const imageb = [{image:"../public/images/blog.jpg"}]

let posts = [];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });


//get the home page
router.get('/', (req, res) => {
    res.render('index', {images: images});
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
router.get('/blog', async (req, res) => {
    posts = await Post.find();
    res.render('blog', {imageb: imageb, posts: posts});
});

//get create blog page
router.get('/createPost', (req, res) => {
    res.render('createPost');
});

//create blog post
router.post("/createPost", upload.single('image'), (req, res) => {
    const obj = {
        blogtitle: req.body.blogtitle,
        blogcontent: req.body.blogcontent,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.originalname)),
            contentType: 'image/png'
        }
    }

    if (!blogtitle || !blogcontent) {
        return res.redirect("/createPost");
    }

    const posts = new Post({ obj });

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
    const blogTitle = req.params.blogtitle;
    posts = await Post.find({ blogtitle: blogTitle });
    isEmpty(posts) ? res.redirect('/') : res.render("posts", { post: posts });
});

//update blog
router.put('/createPost/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete blog
router.delete('/createPost/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post deleted successfully!!");
    } catch (err) {
        res.status(500).json(err);
    }
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
        console.log("login successfully");
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