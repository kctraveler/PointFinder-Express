/**
 * Creates a hash table to look up a merchant name based on a a host name
 * updates the merchant list with the routes available on it. 
 * @author Shane Panchot
 */

const axios = require('axios');
const HashTable = require('../services/hash-table');
const getMerchantByName = require('./db-access');
const airlines = require('./airlines');

/**
 * Returns data for provided URL. Should be JSON here.
 * @async
 * @private
 * @param {String} url - the URL to be accessed.
 * @returns {Promise<JSON>} json from the HTTP response for the URL
 */
const _getJson = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Updates the domains in the primary db to reference back to the index table
 * @param {String} merchantName - name of the merchant
 * @param {String} domainName - domain name
 * @returns {Promise<Boolean>} true if host was added.
 */
const _addMerchDomain = async (merchantName, domainName) => {
    try {
        const merchant = await getMerchantByName(merchantName);
        return merchant.addHost(domainName);
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Updates both the index values and the original db.
 * Only creates an entry if their was an update made on primary db.
 * @param {Promise<JSON>} domainList - JSON file with merchants and their domain names.
 * @param {HashTable} index - the HashTable being used to hold the index.
 */
const _updateMerchants = async (domainList, index) => {
    let domains = await domainList;
    domains = domains.response
    let domainIndex = index;
    // Pretty sure this will work
    //(?!www)\b((\w+)\.{0,1})*[0-9a-zA-Z\-]*(?=(\.com|\.org))
    // old [0-9a-zA-Z\-]*(?=(\.com|\.org))
    const regEx = new RegExp(/(?!www)\b(\w+\.{0,1})[0-9a-zA-Z\-]*(?=(\.com|\.org|\.net))/);
    try {
        // loop through domains in response
        for (let i = 0; i < domains.length; i++) {
            try {
                const merch = domains[i].merchant;
                if (!merch) continue; // skip if the merchant is null
                const name = merch.name;
                const match = regEx.exec(merch.domainMatchPattern);
                let domain = null;
                if (match) {
                    domain = match[0];
                } else {
                    continue; // skip if regex failed
                }
                // Add domain to merchant in db
                let updated = await _addMerchDomain(name, domain);
                // Don't add index if merchant was not updated.
                if (updated) {
                    domainIndex.set(domain, name);
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * Driver function to create the index. 
 * @param {Array<String>} urls - urls to load json data from.
 * @returns {HashTable} - hash table index to look up the name with the 
 */
const _driver = async (airlines) => {
    let indexTable = new HashTable(10000);
    for (let i = 0; i < airlines.length; i++) {
        try {
            let json = await _getJson(airlines[i].domainsUrl);
            await _updateMerchants(json, indexTable);
        } catch (err) {
            console.error(err);
        }
        console.info("Domain Index Finished");
        return indexTable;
    }
};


module.exports = _driver(airlines);