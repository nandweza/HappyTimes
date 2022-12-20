const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const appRouter = require('./Routes/appRouter');

// express app
const app = express();

const port = 4001;
dotenv.config();

//mongodb connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection successfully!"))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//middleware and static files
app.use(express.static('public'));
app.use(express.static('public/uploads'));
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
app.use('/blog', appRouter);
app.use('/contact', appRouter);
app.use('/createBlog', appRouter);
app.use('/allBlogs', appRouter);
app.use('/login', appRouter);
app.use('/admin', appRouter);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
