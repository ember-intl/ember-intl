import { type Registry as Services, service } from '@ember/service';

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
