const express = require('express');

const route = express.Router();

const {
  createCategory,
  categoryById,
  showCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');

const { userById } = require('../middlewares/user');

route.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createCategory);
route.get('/:categoryId', showCategory);
route.get('/', getAllCategory);
route.put(
  '/:categoryId/:userId',
  [requireSignIn, isAuth, isAdmin],
  updateCategory
);
route.delete(
  '/:categoryId/:userId',
  [requireSignIn, isAuth, isAdmin],
  deleteCategory
);

route.param('userId', userById);
route.param('categoryId', categoryById);
module.exports = route;
