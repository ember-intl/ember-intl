// BEGIN-SNIPPET docs__helpers__format-date__example-2__example.ts
import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get today(): Date {
    return new Date();
  }
}
// END-SNIPPET
