var express = require('express');
var router = express.Router();
const {check} = require('express-validator');

const UserController = require('../app/controllers/UserController');


router.post('/create', [
    check('name').exists(),
    check('family').exists(),
    check('bio').isLength({min: 5})
], UserController.create);
router.get('/list', UserController.list);
router.get('/:id', UserController.findById);
router.delete('/:id', UserController.delete);
router.put('/', UserController.update);

module.exports = router;
