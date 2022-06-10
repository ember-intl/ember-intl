// BEGIN-SNIPPET docs__helpers__format-list__example-1__my-component.js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
  get fruits() {
    return ['apples', 'bananas', 'oranges'];
  }
}
// END-SNIPPET
