import { createIntl, createIntlCache, IntlErrorCode } from '@formatjs/intl';

interface IntlError extends Error {
  code: IntlErrorCode;
}

export { createIntl, createIntlCache };

export function onFormatjsIntlError(error: IntlError): void {
  switch (error.code) {
    case IntlErrorCode.MISSING_TRANSLATION: {
      // Do nothing
      break;
    }

    default: {
      throw error;
    }
  }
}
