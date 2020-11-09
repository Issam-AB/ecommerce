const Product = require('../models/product');
const formidable = require('formidable');
const joi = require('joi');
const fs = require('fs');
const _ = require('lodash');

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, field, files) => {
    if (err) {
      res.status(400).json({
        message: 'Image could not uploaded !',
      });
    }
    let product = new Product(field);
    if (files.photo) {
      if (files.photo.size > Math.pow(10, 6)) {
        res.status(400).json({
          error: 'Image should to be less than 1mb in size !',
        });
      }
      const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        price: joi.required(),
        quantity: joi.required(),
        category: joi.required(),
        shipping: joi.required(),
      });
      const { error } = schema.validate(field);
      if (error) {
        return res.status(400).json({
          error: `le champs ${error.details[0].message}`,
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        res.status(404).json({
          err: 'product not persist',
        });
      }
      res.json({
        product,
      });
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, field, files) => {
    if (err) {
      res.status(400).json({
        message: 'Image could not uploaded !',
      });
    }
    let product = req.product;
    product = _.extend(product, field);
    if (files.photo) {
      if (files.photo.size > Math.pow(10, 6)) {
        res.status(400).json({
          error: 'Image should to be less than 1mb in size !',
        });
      }
      const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        price: joi.required(),
        quantity: joi.required(),
        category: joi.required(),
      });
      const { error } = schema.validate(field);
      if (error) {
        return res.status(400).json({
          error: `le champs ${error.details[0].message}`,
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        res.status(404).json({
          err: 'product not updated',
        });
      }
      res.json({
        product,
      });
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(404).json({
        error: 'Product not fond',
      });
    }
    req.product = product;
    next();
  });
};

exports.showProduct = (req, res) => {
  req.product.photo = undefined;
  res.json({
    product: req.product,
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      res.status(404).json({
        error: 'Product not fond',
      });
    }
    res.status(204).json({});
  });
};

exports.allProduct = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let order = req.query.order ? req.query.order : 'asc';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(404).json({
          error: 'products not fond !',
        });
      }
      res.json({
        products,
      });
    });
};

exports.relatedProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find({
    category: req.product.category,
    _id: { $ne: req.product._id },
  })
    .select('-photo')
    .limit(limit)
    .populate('category', 'id name')
    .exec((err, products) => {
      if (err) {
        res.status(404).json({
          error: 'Product not fond !',
        });
      }
      res.json({
        products,
      });
    });
};

exports.searchProduct = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let order = req.query.order ? req.query.order : 'asc';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filter) {
    if (req.body.filter[key].length > 0) {
      if (key === 'price') {
        // gte - greater than price [0-10]
        // lte less than
        findArgs[key] = {
          $gte: req.body.filter[key][0],
          $lte: req.body.filter[key][1],
        };
      } else {
        findArgs[key] = req.body.filter[key];
      }
    }
  }
  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(skip)
    .exec((err, products) => {
      if (err) {
        res.status(404).json({
          error: 'products not fond !',
        });
      }
      res.json({
        products,
      });
    });
};

exports.photoProduct = (req, res) => {
  const { data, contentType } = req.product.photo;
  if (data) {
    res.set('Content-Type', contentType);
    return res.send(data);
  }
};
