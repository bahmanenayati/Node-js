var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/UserController');

router.get('/list', UserController.list);
router.get('/:id', UserController.findById);
router.post('/create', UserController.create);

module.exports = router;
