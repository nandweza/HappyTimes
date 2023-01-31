const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const appRouter = require('./Routes/appRouter');

// express app
const app = express();

const port = process.env.PORT || 4000;
dotenv.config();
mongoose.set('strictQuery', true);

//mongodb connection
mongoose.connect("mongodb+srv://Allan:root@cluster0.nyl3ply.mongodb.net/happytimesDB?retryWrites=true&w=majority")
.then(() => console.log("DB Connection successfully!"))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//middleware and static files
app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(express.static('public/styles.css'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use('/', appRouter);
app.use('/about-us', appRouter);
app.use('/products', appRouter);
app.use('/addProducts', appRouter);
app.use("/allProducts", appRouter);
app.use("/deleteProduct", appRouter);
app.use("/service", appRouter);
app.use("/deleteService", appRouter);
app.use('/blog', appRouter);
app.use('/contact', appRouter);
app.use('/createBlog', appRouter);
app.use('/allBlogs', appRouter);
app.use('/login', appRouter);
app.use('/admin', appRouter);
app.use('/allPosts', appRouter);
app.use('/edit', appRouter);
app.use('/delete', appRouter);
app.use('/postcomments', appRouter);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
