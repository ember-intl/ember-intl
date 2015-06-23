/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import MessageHelper from './format-message';
import computed from 'ember-new-computed';

export default MessageHelper.extend({
    formatter: computed({
        get() {
            return this.container.lookup(`ember-intl@formatter:format-html-message`);
        }
    })
});
