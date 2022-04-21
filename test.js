const axios = require('axios');

let dummyUrl = 'http://www.example.com';
let americanDealUrl = 'https://www.aadvantageeshopping.com/merchantlisthtml____.htm';



axios
    .get(dummyUrl)
    .then(res => tokenizer(res.data, ''))
    .catch(error => console.log(error));

let tokenizer = (data, htmlParser) => {
    let tokens = [];
    let state = isTag
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
    };
}