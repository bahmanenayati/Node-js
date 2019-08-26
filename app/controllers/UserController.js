const User = require('../models/User');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const redis = require("redis");
const client = redis.createClient();
const {promisify} = require('util');
const getAsync = promisify(client.HGETALL).bind(client);

class UserController {
    static list(request, response) {
        // const users = [
        //     {
        //         name: "Bahman",
        //         family: "Enayatei",
        //     },
        //     {
        //         name: "Atefe",
        //         family: "Asgharzadeh",
        //     }
        // ];
        // client.hset('joorpin', 'users', JSON.stringify(users))
        // client.hget(`joorpin`, `users`, (err, result) => {
        //     // If that key exist in Redis store
        //     if (result) {
        //         let jsonResult = JSON.parse(result)
        //         jsonResult.push({
        //             name: "maryam",
        //             family: "Asgharzadeh"
        //         })
        //         return response.status(200).json(jsonResult);
        //     }
        // });
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
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({errors: errors.array()});
        }
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

    static delete(request, response) {
        User.findByIdAndDelete(request.params.id).then(() => {
            response.status(200).json({
                message: "User deleted",
            });
        }).catch(error => {
            response.status(500).json({
                error
            });
        });
    }

    static update(request, response) {
        User.updateOne({_id: request.body.id}, request.body)
            .then(result => {
                response.status(200).json({
                    message: result
                });
            }).catch(error => {
            response.status(500).json({
                error
            });
        });
    }

    static listView(request, response) {
        const users = User.find()
            .sort({date: 'desc'})
            .then(users => {
                return users
            });
        response.render('user/list', {title: 'کاربران', users: users});
    }
}

exports.listView = async (request, response) => {
    const users = await usersList()
    response.render('user/list', {title: 'کاربران', users: users});
};

function usersList() {
    return new Promise(resolve => {
        User.find()
            .sort({date: 'desc'})
            .then(users => {
                resolve(users)
            });
    })
}
