const {
    next
} = require('cheerio/lib/api/traversing');
const getMerchantByName = require('./db-access');
const index = require('./db-index-host');

let getMerchantByDomain = async (domain) => {
    try {
        let dbIndex = await index;
        const name = await dbIndex.get(domain);
        if (!name) return false;
        return getMerchantByName(name);
    } catch (error) {
        console.error(error);
    }
}

module.exports = getMerchantByDomain;