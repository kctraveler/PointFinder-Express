/**
 * Router class for the /deal path
 * @Author Shane Panchot
 */
const express = require('express');
let router = express.Router();
let merchantController = require('../controllers/merchant-controller.js')
/* return deals for the given merchant id */
router.get('/:lookupDomain',
    merchantController.getMerchant,
    merchantController.merchantNotFound);

module.exports = router;