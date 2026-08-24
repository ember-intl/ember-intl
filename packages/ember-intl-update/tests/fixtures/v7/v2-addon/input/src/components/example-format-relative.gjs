import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class ExampleFormatRelative extends Component {
  @service intl;

  get output() {
    return this.intl.formatRelative(-1);
  }

  <template>
    {{this.output}}
  </template>
}
