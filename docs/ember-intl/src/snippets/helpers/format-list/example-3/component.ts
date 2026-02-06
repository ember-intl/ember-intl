import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get letters(): string[] {
    return ['A', 'B', 'C'];
  }
}
