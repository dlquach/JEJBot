class ImagePermissions {
    constructor() {
        this._deniedDomains = [];
        this.domainRegex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
    }

    /**
     * Block input domain on all !image calls.
     * @param {string} domain 
     */
    addToDeniedDomains(domain) {
        this._deniedDomains.push(domain);
    }

    /**
     * Allow the input domain to be used in !image calls again.
     * @param {string} domain 
     */
    removeFromDeniedDomains(domain) {
        this._deniedDomains = this._deniedDomains.filter(itm => itm !== domain);
    }

    /**
     * Check storage and return boolean based on input URL contains a blocked domain.
     * @param {string} url 
     */
    domainIsAllowed(url) {
        // Will break if query string is unescaped and has URL format
        var dmn = url.match(this.domainRegex);

        if (dmn.length > 0) {
            var found = this._deniedDomains.filter(domain => dmn[0].includes(domain));
            return found.length > 0;
        }

        // Input URL doesn't have a valid domain from regex
        return false;
    }

    clearDeniedDomains() {
        this._deniedDomains = [];
    }

    stringifyDeniedDomains() {
        return this._deniedDomains.join('\n');
    }
}

var ImageValidator = new ImagePermissions();

module.exports = ImageValidator;