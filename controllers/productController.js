const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');

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
