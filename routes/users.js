var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/UserController');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/list', UserController.userList);

module.exports = router;
