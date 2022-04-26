let data = require('./db.js');


let getMerchantByName = async (name) => {
    try {
        let db = await data;
        return db.get(name);
    } catch (err) {
        console.log(err);
    }
}



module.exports = getMerchantByName;