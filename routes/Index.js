var express = require('express');
var router = express.Router();
var app = express()

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
