class ImagePermissions {
    deniedDomains = [];
    domainRegex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

    /**
     * Block input domain on all !image calls.
     * @param {string} domain 
     */
    addToDeniedDomains(domain) {
        this.deniedDomains.push(domain);
    }

    /**
     * Allow the input domain to be used in !image calls again.
     * @param {string} domain 
     */
    removeFromDeniedDomains(domain) {
        this.deniedDomains = this.deniedDomains.filter(itm => itm !== domain);
    }

    /**
     * Check storage and return boolean based on input URL contains a blocked domain.
     * @param {string} url 
     */
    checkDomainIsDenied(url) {
        // Will break if query string is unescaped and has URL format
        var found = url.match(this.domainRegex);

        return found.length > 0;
    }

    stringifyDeniedDomains() {
        return this.deniedDomains.join('\n');
    }
}

var ImageValidator = ImagePermissions();

module.exports = ImageValidator;