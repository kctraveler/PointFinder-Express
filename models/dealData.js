/**
 * Temporary use instead of db. Not sure if models is really needed or if just calling this db/services would be better.
 */
let data = [{
    merchant: 'Adidas',
    host: 'adidas.com',
    id: 1,
    deals: [{
        airline: 'American',
        details: '2 Points / Dollar',
        url: 'aa.adidas.com'
    }, {
        airline: 'Delta',
        details: '1 Point / Dollar',
        url: 'delta.adidas.com'
    }]
}]

module.exports = data;