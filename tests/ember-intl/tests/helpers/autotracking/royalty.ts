import type { Registry as Services } from '@ember/service';
import * as s from '@ember/service';

const service = s.service ?? s.inject;

export class Royalty {
  @service declare intl: Services['intl'];

  get message(): string {
    switch (this.intl.primaryLocale) {
      case 'de-de': {
        return `<div class="message">Hallo, {name}! Du hast {points, number} Treuepunkte.</div>`;
      }

      case 'en-us': {
        return `<div class="message">Hello, {name}! You have {points, number} royalty points.</div>`;
      }
    }

    throw new Error('Locale must be de-de or en-us.');
  }
}
