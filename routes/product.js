const express = require('express');

const route = express.Router();

const {
  createProduct,
  showProduct,
  productById,
  removeProduct,
  updateProduct,
  allProduct,
  relatedProduct,
  searchProduct,
} = require('../controllers/productController');

const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');

const { userById } = require('../middlewares/user');

route.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createProduct);
route.put(
  '/:ProductId/:userId',
  [requireSignIn, isAuth, isAdmin],
  updateProduct
);
route.get('/:ProductId', showProduct);
route.delete(
  '/:ProductId/:userId',
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);
route.get('/', allProduct);
route.get('/related/:ProductId', relatedProduct);
route.post('/search', searchProduct);

route.param('userId', userById);
route.param('ProductId', productById);

module.exports = route;
