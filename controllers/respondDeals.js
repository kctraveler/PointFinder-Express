const getMerchantByName = require('../data/db-access');

exports.getDeals = async (req, res, next) => {
    let reqName = req.params.name;
    let merchant = await getMerchantByName(reqName);
    res.json(merchant);
}

exports.dealNotFound = (req, res) => {
    res.status(204).send(`No merchant found with id: ${req.params.merchantId}`);
}