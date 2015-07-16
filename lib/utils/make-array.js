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
