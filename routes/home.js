const router = require('express').Router();

//display the home page...
router.get('/', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;