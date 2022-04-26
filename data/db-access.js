let data = require('./db.js');

let getMerchantByName = async (name) => {
    let merch = await data;
    return merch.get(name);
}

module.exports = getMerchantByName;