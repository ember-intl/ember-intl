/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import ENV from '../config/environment';
import { addLocaleData } from 'ember-intl/utils/data';
import { filterBy } from 'ember-intl/utils/initialize';
import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';

export function instanceInitializer(instance) {
    let service = instance.container.lookup('service:intl');

    service.createLocale = service.createLocale.bind(service, instance);

    filterBy(ENV, 'cldrs').forEach((key) => {
        addLocaleData(require(key, null, null, true)['default']);
    });

    filterBy(ENV, 'translations').forEach((key) => {
        let localeSplit = key.split('\/');
        let locale = localeSplit[localeSplit.length - 1];
        service.createLocale(locale, require(key, null, null, true)['default']);
    });

    instance.registry.register('helper:format-date', FormatDate);
    instance.registry.register('helper:format-time', FormatTime);
    instance.registry.register('helper:format-relative', FormatRelative);
    instance.registry.register('helper:format-number', FormatNumber);
    instance.registry.register('helper:format-html-message', FormatHtmlMessage);
    instance.registry.register('helper:format-message', FormatMessage);
}

export default {
  name: 'ember-intl',
  initialize: instanceInitializer
}
