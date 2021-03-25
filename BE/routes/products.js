require('../DATA/database');
var express = require('express');
var router = express.Router();
const productModel = require("../MODELS/products")

router.get('/', (req, res) => {
  productModel.find({}, (err, items) => {
    if (err) {
      res.send('error')
    }
    else {
      res.send(items);
    }
  })
});

router.post('/filter', (req, res) => {
  productModel.find( req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
  })
});

module.exports = router;