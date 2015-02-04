var Stream = Ember.__loader.require('ember-metal/streams/stream')['default'];

function read (object) {
    if (object && object.isStream) {
        return object.value();
    } else {
        return object;
    }
}

export var Stream = Stream;
export var read = read;

export default {
    Stream: Stream,
    read:   read
}