import type { Registry as Services } from '@ember/service';
import * as s from '@ember/service';

const service = s.service ?? s.inject;

export class Currency {
  @service declare intl: Services['intl'];

  get unit(): string {
    switch (this.intl.primaryLocale) {
      case 'de-de': {
        return 'EUR';
      }

      case 'en-us': {
        return 'USD';
      }
    }

    throw new Error('Locale must be de-de or en-us.');
  }
}
