/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
    __loader
} = Ember;

export const Stream = __loader.require('ember-metal/streams/stream')['default'];

// The below read, readHash methods are from Ember.js
// https://github.com/emberjs/ember.js/blob/master/packages/ember-metal/lib/streams/utils.js
// License: https://github.com/emberjs/ember.js/blob/master/LICENSE
export function read(obj) {
    if (obj && obj.isStream) {
        return obj.value();
    }

    return obj;
}

export function readHash(object) {
    const ret = {};

    for (var key in object) {
        ret[key] = read(object[key]);
    }

    return ret;
}

export function destroyStream(stream) {
    if (stream && !stream.destroyed) {
        stream.destroy();
    }
}

export default {
    read,
    readHash,
    destroyStream,
    Stream
};
