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
