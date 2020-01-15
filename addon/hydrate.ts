/* globals requirejs */

import { warn } from '@ember/debug';
import links from './utils/links';
import IntlService from './services/intl';

/**
 * Peeks into the requirejs map and registers all locale data (CLDR & Translations) found.
 *
 * @private
 * @hide
 */
export default function(service: IntlService, owner: any) {
  const { modulePrefix } = owner.resolveRegistration('config:environment');
  const cldrsPrefix = `${modulePrefix}/cldrs/`;
  const translationsPrefix = `${modulePrefix}/translations/`;

  let foundCldrs = false;

  // @ts-ignore
  for (const key in requirejs.entries) {
    if (key.indexOf(cldrsPrefix) === 0) {
      foundCldrs = true;
      owner.resolveRegistration(`cldr:${key.split('/').pop()}`).forEach(service.addLocaleData);
    } else if (key.indexOf(translationsPrefix) === 0) {
      const localeName = key.split('/').pop() as string;
      service.addTranslations(localeName, owner.resolveRegistration(`translation:${localeName}`));
    }
  }

  if (!foundCldrs) {
    warn(
      `[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation,
      see: ${links.asyncTranslations}.`,
      false,
      {
        id: 'ember-intl-missing-cldr-data'
      }
    );
  }
}
