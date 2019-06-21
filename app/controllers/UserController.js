let User = require('../models/User');
const mongoose = require('mongoose');

class UserController {
    static list(request, response) {
        User.find()
            .sort({date: 'desc'})
            .then(docs => {
                response.send(docs)
            });
    }

    static findById(request, response) {
        User.findById(request.params.id)
            .exec()
            .then(user => {
                if (!user) {
                    response.status(404).json({
                        message: "User not found."
                    });
                }
                response.status(200).json(user);
            })
            .catch(error => {
                response.status(500).json({
                    error
                });
            });
    }

    static create(request, response) {
        const createUser = new User({
            _id: mongoose.Types.ObjectId(),
            name: request.body.name,
            family: request.body.family,
            bio: request.body.bio
        });
        createUser.save()
        response.status(200).json({
            message: "User created",
        });
    }
}

module.exports = UserController