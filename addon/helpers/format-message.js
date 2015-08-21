/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import helperFactory from './-base';

const { Helper, get } = Ember;

let MessageHelper = helperFactory('message');

export function getValue(params, hash) {
    if (params.length) {
        return params[0];
    }

    if (hash && hash.hasOwnProperty('id')) {
        const intl = get(this, 'intl');
        return intl.findTranslationByKey(hash.id, hash.locale);
    }
}

if (Helper && Helper.detect(MessageHelper)) {
    MessageHelper = MessageHelper.extend({
        getValue: getValue
    });
}

export default MessageHelper;
