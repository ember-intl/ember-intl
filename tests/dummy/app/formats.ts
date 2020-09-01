import type { Formats } from 'ember-intl/types';

const hhmmss = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

const formats: Formats = {
  date: { hhmmss: hhmmss },
  time: { hhmmss: hhmmss },
  number: {
    // @ts-expect-error `intl-messageformat` types are incorrect.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#Parameters
    compact: { notation: 'compact' },
    EUR: { style: 'currency', currency: 'EUR' },
    USD: { style: 'currency', currency: 'USD' },
    JPY: { style: 'currency', currency: 'JPY' },
    currency: { style: 'currency', minimumFractionDigits: 2 },
  },
};

export default formats;
