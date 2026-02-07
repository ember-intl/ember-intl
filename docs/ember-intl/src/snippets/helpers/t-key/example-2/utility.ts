import { tKey } from 'ember-intl';

// Values set by backend
export const PAYMENT_METHOD = {
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
  DIRECT_DEBIT: 'direct_debit',
};

export const PAYMENT_METHOD_TRANSLATION_KEYS = {
  [PAYMENT_METHOD.BANK_TRANSFER]: tKey('payment-method.bank-transfer'),
  [PAYMENT_METHOD.CREDIT_CARD]: tKey('payment-method.credit-card'),
  [PAYMENT_METHOD.DIRECT_DEBIT]: tKey('payment-method.direct-debit'),
} as const;
