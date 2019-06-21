class UserController {
    static async signupWithCredentials(req, res) {
        console.log('you are just calling static method')
    }

    static userList(req, res) {
        res.send('Users list');
    }
}

module.exports = UserController