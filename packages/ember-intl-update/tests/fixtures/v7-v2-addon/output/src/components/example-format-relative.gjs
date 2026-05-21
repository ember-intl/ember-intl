import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class ExampleFormatRelative extends Component {
    @service intl;

    get output() {
      return this.intl.formatRelativeTime(-1);
    }

    <template>{{this.output}}</template>
}
