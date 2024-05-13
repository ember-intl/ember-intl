import {
  settled,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { TOptions } from 'ember-intl/services/intl';
import type { Formats, Translations } from 'ember-intl/types';

import { missingMessage } from './-private/missing-message';
import { addTranslations } from './add-translations';

export interface IntlTestContext {
  intl: IntlService;
}

export interface TestContext extends IntlTestContext, BaseTestContext {}

export interface SetupIntlOptions {
  formats?: Formats;

  /**
   * Whether to install the special `missing-message` handler.
   *
   * @defaultValue true
   */
  missingMessage?:
    | boolean
    | ((key: string, locales: string[], options: TOptions) => string);
}

/**
 * Calling this helper will install a special `missing-message` util that will
 * serialize all missing translations in a deterministic manner, including
 * variables you've passed for interpolation. This means that you do not have
 * to explicitly add any translations and can just rely on the implicit
 * serialization. See the docs for detailed examples.
 *
 * In addition to the `hooks` object, you must specify the locale
 * under which your tests make sense.
 *
 * You may pass a `translations` object to stub the translations.
 *
 * @param {object} hooks
 * @param {string} [locale]
 * @param {object} [translations]
 * @param {object} [options]
 */
export function setupIntl(
  hooks: NestedHooks,
  locale: string | string[],
  translations?: Translations,
  options?: SetupIntlOptions,
): void {
  hooks.beforeEach(async function (this: TestContext) {
    if (typeof options?.missingMessage === 'function') {
      this.owner.register('util:intl/missing-message', options.missingMessage);
    } else if ((options?.missingMessage ?? true) === true) {
      this.owner.register('util:intl/missing-message', missingMessage);
    }

    if (options?.formats) {
      const factory = this.owner.factoryFor('service:intl');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Property 'unregister' does not exist on type 'Owner'. Did you mean 'register'?
      this.owner.unregister('service:intl');
      this.owner.register('formats:main', options.formats);
      this.owner.register('service:intl', factory);
    }

    this.intl = this.owner.lookup('service:intl') as IntlService;

    this.intl.setLocale(locale);

    if (translations) {
      addTranslations(translations);
    }

    await settled();
  });
}
