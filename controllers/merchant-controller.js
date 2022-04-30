/**
 * Controller for returning merchant deals.
 */
const getMerchantByName = require('../data/db-access');
const getMerchantByDomain = require('../data/db-index-host-access');

/**
 * Primary middleware function. Looks up the merchant and sends json response if found.
 */
exports.getMerchant = async (req, res, next) => {
    try {
        let reqDomain = req.params.lookupDomain;
        let merchant = await getMerchantByDomain(reqDomain);
        if (merchant) {
            res.json(merchant);
        } else {
            return next();
        }
    } catch (error) {
        return next();
    }
}

/**
 * Send response 204 No Content if the merchant can't be found. 
 */
exports.merchantNotFound = (req, res) => {
    res.status(204).send(`Merchant not found.`);
}