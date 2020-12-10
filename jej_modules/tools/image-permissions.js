class ImagePermissions {
    deniedDomains = [];
    domainRegex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

    /**
     * Specified domain will be added to the list of image domains that will get denied.
     * @param {string} domain 
     */
    addToDeniedDomains(domain) {
        this.denied.push(domain);
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
}

var ImageValidator = ImagePermissions();

module.exports = ImageValidator;