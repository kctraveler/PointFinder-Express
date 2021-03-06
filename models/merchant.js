const Deal = require('./deal');

class Merchant {
    /**
     * Constructor for merchant object
     * @param {String} merchantName - name of the merchant. 
     * @param {Array<String>|null} hosts - array of strings as hosts.
     * @param {Array<Deal>|null} deals - array of deals. Each element represents an airline. 
     */
    constructor(merchantName, hosts = [], deals = []) {
        this.merchantName = merchantName;
        this.hosts = hosts;
        this.deals = deals;
    }

    /**
     * Adds a deal to the array.
     * @param {Deal} deal - Deal object to add
     */
    addDeal(deal) {
        this.deals.push(deal);
    }

    /**
     * Adds a new host to the array
     * @param {String} host - hostname to add
     * @returns {Boolean} true if host was added
     */
    addHost(hostName) {
        if (!this.hosts) {
            this.hosts = [hostName];
        } else {
            for (const host of this.hosts) {
                if (host === hostName) return false;
            }
            this.hosts.push(hostName);
        }
        return true;
    }
}

module.exports = Merchant;