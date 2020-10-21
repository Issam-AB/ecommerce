const Users = require('../models/user');

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
