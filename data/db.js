/**
 * A substitute for a database. When application loads, data will be acquired, 
 * organized and made available for the application.
 * Relying on the start and stop of Heroku dynos to keep data up to date.
 *  
 */
//TODO Add support for multiple airlines. 
const HashTable = require('../services/hash-table');
const Merchant = require('../models/merchant');
const Deal = require('../models/deal');
const axios = require('axios');
const HTMLParser = require('node-html-parser');

/**
 * List of URLs within objects.
 */
const dealURLs = [{
    airline: 'aal',
    url: 'https://www.aadvantageeshopping.com/merchantlisthtml____.htm'
}];

/**
 * Gets the HTML as a string for the provided URL.
 * Should provide parsed JSON if the content type of the response.
 * @private
 * @param {Array<Object>} url - objects should include airline and url 
 * @returns {response.data} - returns only the response data 
 */
const _getDeals = async (url) => {
    try {
        const newURL = url;
        const response = await axios.get(newURL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Takes an HTML string and returns a parsed HTML document.
 * @private
 * @param {Axios.response} response - An HTML string from axios response
 * @returns Parsed HTML document.
 */
let _parseData = async (response) => {
    let rawData = await response;
    let document = HTMLParser.parse(rawData);
    return document;
}

/**
 * Uses queryselctors to pull out the meaningful data.
 * Stores data as Merchant objects in a HashTable.
 * @private
 * @param {HTMLParser.document} parsedHTML - Parsed Document
 * @returns {HashTable} HashTable with Merchant Name as the keys.
 */
let _extractMerchants = async (parsedHTML) => {
    let document = await parsedHTML;
    let merchantParents = document.querySelectorAll('[data-sort-type="byAlpha"]  li a');
    let data = new HashTable(2048);
    for (let i = 0; i < merchantParents.length; i++) {
        try {
            let current = merchantParents[i];
            let href = 'https://www.aadvantageeshopping.com/' +
                current.attributes.href;
            let name = current.querySelector('span.mn_merchName').childNodes[0]._rawText;
            let value;
            if (current.querySelector('span.mn_rebate.mn_deactivatedRebate')) {
                value = null;
            } else {
                value = current.querySelector('span.mn_rebate span.mn_sr-only').childNodes[0]._rawText;
            }
            let deal = new Deal("AAL", value, href);
            let merchant = new Merchant(name, null, [deal]);
            data.set(name, merchant);
        } catch (error) {
            console.error("Unprocessed Deal", error);
        }
    }
    return data;
}

/**
 * Driver class to provide the database
 * @private
 * @param {Array<Object>} dealURLs - objects should contain an airline and url.
 * @returns {HashTable<Merchant>} - Key Merchant Name, Value Merchant object.
 */
let _merchantData = async (dealURLs) => {
    let response = await _getDeals(dealURLs[0].url);
    let parsedData = await _parseData(response);
    let extractedData = await _extractMerchants(parsedData);
    console.info(`Merchant Database Loaded`);
    return extractedData;
}

module.exports = _merchantData(dealURLs);