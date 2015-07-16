var makeArray = require('./make-array');

function uniqueByString(array) {
    var found = Object.create(null);
    var out = [];

    makeArray(array).forEach(function(item) {
        if (typeof item !== 'string' || found[item.toLowerCase()]) {
            return;
        }

        out.push(item);
        found[item.toLowerCase()] = true;
    });

    return out;
}

module.exports = uniqueByString;
