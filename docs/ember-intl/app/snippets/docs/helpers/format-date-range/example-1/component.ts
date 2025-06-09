// BEGIN-SNIPPET docs__helpers__format-date-range__example-1__example.ts
import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get today(): Date {
    return new Date();
  }

  get yesterday(): Date {
    return new Date(this.today.valueOf() - 24 * 60 * 60 * 1000);
  }
}
// END-SNIPPET
