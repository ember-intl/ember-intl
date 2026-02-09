# Services

`ember-intl` provides a locale-aware service called `intl`. This service allows you to use `ember-intl`'s API in any class: Components, routes, even _native_ classes!

::: code-group

```gts [app/components/example.gts]{9,14-16}
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';

interface ExampleSignature {
  Args: {};
}

export default class Example extends Component<ExampleSignature> {
  @service declare intl: Services['intl'];

  // Re-computes when locale changes
  get labels(): string[] {
    return [
      this.intl.t('select.option-1'),
      this.intl.t('select.option-2'),
      this.intl.t('select.option-3'),
    ];
  }

  <template>
    <select>
      {{#each this.labels as |label|}}
        <option>{{label}}</option>
      {{/each}}
    </select>
  </template>
}
```

:::

> [!TIP]
> 
> Use `getOwner()` and `setOwner()` to inject services in a native class.

::: code-group

```gts [app/components/example.gts]{1,16}
import { getOwner } from '@ember/owner';
import Component from '@glimmer/component';
import type { Payment } from 'my-app/utils/models';
import { Formatter } from 'my-app/utils/payment';

interface ExampleSignature {
  Args: {
    payment: Payment;
  };
}

export default class Example extends Component<ExampleSignature> {
  get payment(): Formatter | undefined {
    const { payment } = this.args;

    return new Formatter(getOwner(this), { payment });
  }

  <template>
    Amount: {{this.payment.amount}}
    Method: {{this.payment.method}}
  </template>
}
```

```gts [app/utils/models.ts]
export type Payment = {
  amount: number;
  id: string;
  method: 'bank_transfer' | 'credit_card' | 'direct_debit';
};
```

```gts [app/utils/payment.ts]{2,18,25,31,35}
import type Owner from '@ember/owner';
import { setOwner } from '@ember/owner';
import { type Registry as Services, service } from '@ember/service';
import { tKey } from 'ember-intl';
import type { Payment } from 'my-app/utils/models';

const TRANSLATION_KEYS = {
  bank_transfer: tKey('payment.method.bank-transfer'),
  credit_card: tKey('payment.method.credit-card'),
  direct_debit: tKey('payment.method.direct-debit'),
} as const;

type Args = {
  payment: Payment;
};

export class Formatter {
  @service declare intl: Services['intl'];

  declare args: PaymentArgs;

  get amount(): string {
    const { payment } = this.args;

    return this.intl.formatNumber(payment.amount, { format: 'EUR' });
  }

  get method(): string {
    const { payment } = this.args;

    return this.intl.t(TRANSLATION_KEYS[payment.method]);
  }

  constructor(owner: Owner, args: Args) {
    setOwner(this, owner);

    this.args = args;
  }
}
```

:::
