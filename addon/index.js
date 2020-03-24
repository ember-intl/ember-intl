export { default as Service } from './services/intl';
export * from './macros';

import { deprecate } from '@ember/application/deprecations';
import { t } from './macros';

export function translationMacro(...args) {
  deprecate(`ember-intl: 'translationMacro' was renamed to just 't'. Please update the import statement.`, false, {
    id: 'ember-intl.translationMacro',
    until: '5.0.0',
  });

  return t(...args);
}
