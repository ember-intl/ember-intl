// BEGIN-SNIPPET docs__helpers__format-time__example-4__example.ts
import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get today(): Date {
    return new Date();
  }
}
// END-SNIPPET
