var rename = require('broccoli-stew').rename;

function lowercaseTree(tree) {
    return rename(tree, function(filepath) {
        return filepath.toLowerCase();
    });
}

module.exports = lowercaseTree;
