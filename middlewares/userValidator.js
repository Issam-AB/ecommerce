exports.userSignUpValidator = (req, res, next) => {
  req.check('name', 'Name is Required !').notEmpty();

  req
    .check('email', 'email should to respect email format !')
    .notEmpty()
    .isEmail();

  req
    .check('password', 'Password is Required !')
    .notEmpty()
    .isLength({ min: 6, max: 10 })
    .withMessage('Password must be between 6 and 10 Caracters');

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({ error: errors[0].msg });
  }

  next();
};
