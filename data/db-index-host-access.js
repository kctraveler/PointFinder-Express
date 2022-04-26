const getMerchantByName = require('./db-access');
const index = require('./db-index-host');

let getMerchantByDomain = async (domain) => {
    let dbIndex = await index;
    try {
        const name = await dbIndex.get(domain);
        if (!name) return false;
        return getMerchantByName(name);
    } catch (err) {
        console.error(err);
    }
}

module.exports = getMerchantByDomain;