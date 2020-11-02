const Category = require('../models/category');
const _ = require('lodash');
const { body } = require('express-validator/check');

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Bad Requist !',
      });
    }
    res.json({
      category: category,
    });
  });
};
exports.updateCategory = (req, res) => {
  let category = req.category;
  category = _.extend(category, req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Bad Requist !',
      });
    }
    res.json({
      category,
      meessage: 'category updated',
    });
  });
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, category) => {
    if (err) {
      req.status(404).json({
        error: err,
      });
    }
    res.json({
      category,
    });
  });
};

exports.deleteCategory = (req, res) => {
  let category = req.category;
  category.name = body.name;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'category not fond !',
      });
    }
    res.status(204).json({
      meessage: 'category delete',
    });
  });
};
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(404).json({
        error: 'Category not fond !',
      });
    }
    req.category = category;
    next();
  });
};

exports.showCategory = (req, res) => {
  let category = req.category;
  res.json({
    category,
  });
};
