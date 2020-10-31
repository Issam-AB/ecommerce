exports.getOneUser = (req, res) => {
  res.json({
    user: req.profile,
  });
};

console.log(new Date())  