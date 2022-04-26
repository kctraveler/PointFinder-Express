const express = require('express');
let router = express.Router();
let respondDeals = require('../controllers/respondDeals')
/* return deals for the given merchant id */
router.get('/:name', respondDeals.getDeals, respondDeals.dealNotFound);

module.exports = router;