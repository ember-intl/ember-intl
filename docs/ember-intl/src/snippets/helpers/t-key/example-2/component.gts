import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_TRANSLATION_KEYS,
} from 'my-app/utils/payment';

type Option = {
  label: string;
  value: string;
};

interface PaymentMethodSignature {
  Args: {};
}

export default class PaymentMethod extends Component<PaymentMethodSignature> {
  @service declare intl: Services['intl'];

  get options(): Option[] {
    return Object.values(PAYMENT_METHOD).map((paymentMethod) => {
      const key = PAYMENT_METHOD_TRANSLATION_KEYS[paymentMethod]!;

      return {
        label: this.intl.t(key),
        value: paymentMethod,
      };
    });
  }

  <template>
    {{#each this.options as |opt|}}
      <option value={{opt.value}}>
        {{opt.label}}
      </option>
    {{/each}}
  </template>
}
