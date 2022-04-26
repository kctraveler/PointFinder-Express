/**
 * Generate the test data that can be used to simulate data over time.
 */

const axios = require('axios');
const {
    ListNode
} = require('../services/linked-list');

let dummyUrl = 'http://www.example.com';
let americanDealUrl = 'https://www.aadvantageeshopping.com/merchantlisthtml____.htm';

// axios
//     .get(dummyUrl)
//     .then(res => tokenizer(res.data, ''))
//     .catch(error => console.log(error));