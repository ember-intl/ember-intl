import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_TRANSLATION_KEYS,
} from 'my-app/utils/payment';

export default class PaymentMethod extends Component {
  @service declare intl: Services['intl'];

  get options() {
    return Object.values(PAYMENT_METHOD).map((paymentMethod) => {
      const label = this.intl.t(PAYMENT_METHOD_TRANSLATION_KEYS[paymentMethod]);

      return {
        label,
        value: paymentMethod,
      };
    });
  }
}
