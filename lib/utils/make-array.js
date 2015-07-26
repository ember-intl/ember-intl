/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

 function makeArray(arr) {
    if (typeof arr === 'undefined') {
        return [];
    }

    if (!Array.isArray(arr)) {
        return [arr];
    }

    return arr;
}

module.exports = makeArray;
