/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import factory from './-base';
import { getValue } from './format-message';

const { Helper } = Ember;

let HtmlMessageHelper = factory('html-message');

if (Helper && Helper.detect(HtmlMessageHelper)) {
    HtmlMessageHelper = HtmlMessageHelper.extend({
        getValue: getValue
    });
}

export default HtmlMessageHelper;
