/**
 * Creates a hash table to look up a merchant name based on a a host name
 * updates the merchant list with the routes available on it. 
 */

const axios = require('axios');
const HashTable = require('../services/hash-table');
const getMerchantByName = require('./db-access');

const urls = ['https://api.cartera.com/content/v4/placements?brand_id=251&app_key=9ec260e91abc101aaec68280da6a5487&app_id=672b9fbb&sort_by=name&content_group_id=0&fields=merchant.id%2Cmerchant.name%2Cmerchant.domainMatchPattern'];

/**
 * Returns data for provided URL. Should be JSON here.
 * @param {String} url - the URL to be accessed.
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
 * @param {JSON} domainList - JSON file with merchants and their domain names.
 */
const _updateMerchants = async (domainList) => {
    let domains = await domainList;
    domains = domains.response
    let domainIndex = new HashTable();
    const regEx = new RegExp('[0-9a-zA-Z\-]*(?=(\.com|\.org))');
    try {
        for (let i = 0; i < domains.length; i++) {
            try {
                const merch = domains[i].merchant;
                if (!merch) continue;
                const name = merch.name;
                const match = regEx.exec(merch.domainMatchPattern);
                let domain = null;
                if (match) {
                    domain = match[0];
                } else {
                    continue;
                }
                let updated = await _addMerchDomain(name, domain);
                if (updated) {
                    domainIndex.set(domain, name);
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        return domainIndex;
    }
}

/**
 * Driver function to create the index. 
 * @param {Array<String>} urls - urls to load json data from.
 * @returns {HashTable} - hash table index to look up the name with the 
 */
const driver = async (urls) => {
    try {
        let json = await _getJson(urls[0]);
        let index = await _updateMerchants(json);
        return index;
    } catch (err) {
        console.error(err);
    }
};


module.exports = driver(urls);