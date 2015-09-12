/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';
import registerHelper from 'ember-intl/utils/register-helper';
import { instanceInitializer } from '../instance-initializers/ember-intl';

// This is solely for the purpose of supporting < 1.13.0
// any new functionality for >= 1.13.0 should go in a new initializer
// because it is programmatically removed on build within `index.js`
export function initializer(registry, app = {}) {
  registerHelper('format-date', FormatDate, registry);
  registerHelper('format-time', FormatTime, registry);
  registerHelper('format-relative', FormatRelative, registry);
  registerHelper('format-number', FormatNumber, registry);
  registerHelper('format-html-message', FormatHtmlMessage, registry);
  registerHelper('format-message', FormatMessage, registry);
  registerHelper('t', FormatMessage, registry);

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
