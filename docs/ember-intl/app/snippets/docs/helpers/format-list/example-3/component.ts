// BEGIN-SNIPPET docs__helpers__format-list__example-3__example.ts
import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get letters(): string[] {
    return ['A', 'B', 'C'];
  }
}
// END-SNIPPET
