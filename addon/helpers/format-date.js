/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import helperFactory from './-base';

export function dateValidator(value, hash) {
    let allowEmpty = true;

    if (hash.hasOwnProperty('allowEmpty')) {
        allowEmpty = !!hash.allowEmpty;
    }

    if (allowEmpty && (value === null || value === '')) {
        return false;
    }

    return true;
}

export default helperFactory('date', null, dateValidator);
