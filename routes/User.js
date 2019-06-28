var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/UserController');


router.post('/create', UserController.create);
router.get('/list', UserController.list);
router.get('/:id', UserController.findById);
router.delete('/:id', UserController.delete);
router.put('/', UserController.update);

module.exports = router;
