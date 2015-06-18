/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { instanceInitializer } from '../instance-initializers/ember-intl';
import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';

export function initializer(registry, app) {
    registry.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    if (!registry.has('adapter:-intl-adapter')) {
        registry.register('adapter:-intl-adapter', IntlAdapter);
    }

    registry.register('helper:format-date', FormatDate);
    registry.register('helper:format-time', FormatTime);
    registry.register('helper:format-relative', FormatRelative);
    registry.register('helper:format-number', FormatNumber);
    registry.register('helper:format-html-message', FormatHtmlMessage);
    registry.register('helper:format-message', FormatMessage);

    if (app.instanceInitializer) {
        return;
    }

    // for backwards compatability < 1.12
    instanceInitializer({
      container: registry
    });
}

export default {
    name: 'ember-intl',
    initialize: initializer
};
