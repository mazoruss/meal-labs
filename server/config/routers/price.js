const express = require('express');
const priceController = require('../../../db/controllers/priceController.js');

const router = new express.Router();

router.route('/:ingredients')
  .get(priceController.getPriceBreakdown);

module.exports = router;
