import Ember from 'ember';

var Stream = Ember.__loader.require('ember-metal/streams/stream')['default'];

// The below read, readHash methods are from Ember.js
// https://github.com/emberjs/ember.js/blob/master/packages/ember-metal/lib/streams/utils.js
// License: https://github.com/emberjs/ember.js/blob/master/LICENSE
function read (object) {
    if (object && object.isStream) {
        return object.value();
    } else {
        return object;
    }
}

export function readHash (object) {
    var ret = {};

    for (var key in object) {
        ret[key] = read(object[key]);
    }

    return ret;
}

function destroyStream (stream) {
    if (stream && !stream.destroyed) {
        stream.destroy();
    }
}

export var readHash = readHash;
export var destroyStream = destroyStream;
export var Stream = Stream;
export var read = read;

export default {
    Stream: Stream,
    read:   read
};
