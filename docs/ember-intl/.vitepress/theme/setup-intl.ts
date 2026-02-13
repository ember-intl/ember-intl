import type { Registry as Services } from '@ember/service';
import IntlService from 'ember-intl/services/intl';

export function setupIntl(): Services['intl'] {
  // @ts-expect-error: This expression is not constructable.
  const intl = new IntlService() as Services['intl'];

  return intl;
}
