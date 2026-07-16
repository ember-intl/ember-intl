import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class ExampleIntlGetTranslation extends Component {
  @service intl;

  get supportsName() {
    const message = this.intl.lookup('hello.message');

    return message.includes('{name}');
  }
}
