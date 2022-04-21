const data = require('../models/dealData');

exports.getDeals = (req, res, next) => {
    let reqId = req.params.merchantId;
    console.log(`request id: ${reqId}`);
    let found = false;
    for (const merchant of data) {
        console.log(`Data Merchant Id: ${merchant.id}`);
        console.log(merchant.id === reqId);
        if (merchant.id == reqId) {
            res.json(merchant);
            found = true;
            break;
        }
    };
    if (!found) {
        next()
    }
}

exports.dealNotFound = (req, res) => {
    res.status(204).send(`No merchant found with id: ${req.params.merchantId}`);
}