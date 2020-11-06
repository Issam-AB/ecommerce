const Users = require('../models/user');

exports.getOneUser = (req, res) => {
  req.profile.hash_password = undefined;
  req.profile.salt = undefined;

  res.json({
    user: req.profile,
  });
};

exports.updateOneUser = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    function (err, user) {
      if (err) {
        res.status(404).json({ err });
      }
      user.hash_password = undefined;
      user.salt = undefined;
      res.json({
        user,
      });
    }
  );
};
