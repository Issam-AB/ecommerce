const Users = require('../models/user');
const jwt = require('jsonwebtoken');

exports.salam = (req, res) => {
    res.send({
        message: "salam user module"
    })
}

exports.signup = (req, res) => {

    const user = new Users(req.body)
    console.log(`saluut ${req.body}`);

    user.save((err, user) => {

        if (err) {
            return res.status(400).send(err)
        }

        res.send(user);
    })
}

exports.signin = (req, res) => {

    const { email, password } = req.body;

    Users.findOne({ email }, (error, user) => {

        if (error || !user) {
            return res.status(400).json({
                error: 'User not fond with this email, Please signUp ! '
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and Password dont match'
            })
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET);
        res.cookie('token', token, { expire: new Date() + 864000 })

        const { _id, name, email, role } = user;
        return res.json({
            token, user: { _id, name, email, role }
        })

    })
}

exports.signout = (req, res) => {

    res.clearCookie('token');

    res.json({
        message: "User Signout"
    })
}
