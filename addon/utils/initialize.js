/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/*global requirejs */

export function filterBy (env, type) {
    return Object.keys(requirejs._eak_seen).filter((key) => {
        return key.indexOf(env.modulePrefix + '\/' + type + '\/') === 0;
    });
}
