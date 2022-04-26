/**
 * This file was used to test the custom data structures created for the project.
 */

// Import our custom HashTable.
const HashTable = require('../services/hash-table');


/**
 * This block can be used to test adding and removing collisions in the hash table.
 */
//let table = new HashTable();
// table.set('Spain', 110);
// table.set('dddd92', 114);
// //console.log(JSON.stringify(table));
// table.remove('Spain');
// table.remove('dddd92');
// table.set('Spain', 111);
// table.set('dddd92', 115);
// table.remove('dddd92');
// table.remove('Spain');

const https = require('https');
const HTMLParser = require('node-html-parser');
const fs = require('fs');

const americanDealUrl = 'https://www.aadvantageeshopping.com/merchantlisthtml____.htm';

https.get(americanDealUrl, res => {
    let data = [];

    res.on('data', chunk => {
        data.push(chunk);
    })

    res.on('end', () => {
        console.log(`End of Response\nStatusCode: ${res.statusCode}`);
        let rawHTML = Buffer.concat(data).toString();
        fs.writeFile('./test/html/test-american-html.html', rawHTML, {
            flag: 'w'
        }, (err) => {
            if (err) {
                return console.log(err);
            }
        });
        let document = HTMLParser.parse(rawHTML);
        console.log(listMerchants(document).analyze());
    })
});

let listMerchants = (document) => {
    let merchantParents = document.querySelectorAll('[data-sort-type="byAlpha"]  li a');
    let data = new HashTable(2048);
    for (let i = 0; i < merchantParents.length; i++) {
        let current = merchantParents[i];
        let merchant = new Merchant();
        merchant.deals[0].href = current.attributes.href;
        merchant.merchName = current.querySelector('span.mn_merchName').childNodes[0]._rawText;
        if (current.querySelector('span.mn_rebate.mn_deactivatedRebate')) {
            merchant.deals[0].value = null;
        } else {
            merchant.deals[0].value = current.querySelector('span.mn_rebate span.mn_sr-only').childNodes[0]._rawText;
        }
        data.set(merchant.merchName, merchant);
    }
    return data;
}

class Merchant {
    constructor() {
        this.merchName = "",
            this.deals = [{
                airline: "",
                href: "",
                value: ""
            }]
    }
}