const getMerchantByName = require('../data/db-access');
const getMerchantByDomain = require('../data/db-index-host-access');

exports.getDeals = async (req, res, next) => {
    let reqDomain = req.params.lookupDomain;
    let merchant = await getMerchantByDomain(reqDomain);
    if (merchant) {
        res.json(merchant);
    } else {
        next;
    }
}

exports.dealNotFound = (req, res) => {
    res.status(204).send(`No merchant found with id: ${req.params.merchantId}`);
}