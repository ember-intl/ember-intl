// BEGIN-SNIPPET docs__helpers__format-date-range__example-4__example.ts
import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get today(): Date {
    return new Date();
  }

  get yesterday(): number {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    return yesterday;
  }
}
// END-SNIPPET
