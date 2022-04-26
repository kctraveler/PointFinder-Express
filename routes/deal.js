/**
 * Router class for the /deal path
 * @Author Shane Panchot
 */
const express = require('express');
let router = express.Router();
let respondDeals = require('../controllers/respondDeals')
/* return deals for the given merchant id */
router.get('/:lookupDomain', respondDeals.getDeals, respondDeals.dealNotFound);

module.exports = router;