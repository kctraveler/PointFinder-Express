/**
 * List of shopping portal resource links.
 */
const airlines = [{
        airline: 'AAL',
        dealsUrl: 'https://www.aadvantageeshopping.com/merchantlisthtml____.htm',
        domainsUrl: 'https://api.cartera.com/content/v4/placements?brand_id=251&app_key=9ec260e91abc101aaec68280da6a5487&app_id=672b9fbb&sort_by=name&content_group_id=0&fields=merchant.id%2Cmerchant.name%2Cmerchant.domainMatchPattern',
        hrefRoot: 'https://www.aadvantageeshopping.com'
    },
    {
        airline: 'DAL',
        dealsUrl: 'https://www.skymilesshopping.com/merchantlisthtml____.htm',
        domainsUrl: 'https://api.cartera.com/content/v4/placements?brand_id=106&app_key=82f17ef5651e834e5d0d1a7081cb455d&app_id=f3cc4f99&content_group_id=0&sort_by=name&fields=merchant.id%2Cmerchant.name%2Cmerchant.domainMatchPattern',
        hrefRoot: 'https://www.skymilesshopping.com'
    },
    {
        airline: 'UAL',
        dealsUrl: 'https://shopping.mileageplus.com/merchantlisthtml____.htm',
        domainsUrl: 'https://api.cartera.com/content/v4/placements?brand_id=227&app_key=e890b0f48aa7523311b3218506ee8e8d&app_id=c5c10c2a&content_group_id=0&sort_by=name&fields=merchant.id%2Cmerchant.name%2Cmerchant.domainMatchPattern',
        hrefRoot: 'https://shopping.mileageplus.com'
    },
    {
        airline: 'LUV',
        dealsUrl: 'https://rapidrewardsshopping.southwest.com/merchantlisthtml____.htm',
        domainsUrl: 'https://api.cartera.com/content/v4/placements?brand_id=247&app_key=1f5f444ceeb840c9fc14c4a5ca0886d4&app_id=29d31a15&content_group_id=0&sort_by=name&fields=merchant.id%2Cmerchant.name%2Cmerchant.domainMatchPattern',
        hrefRoot: 'https://rapidrewardsshopping.southwest.com'
    }
];

module.exports = airlines;