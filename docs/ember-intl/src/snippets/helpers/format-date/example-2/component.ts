import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get today(): Date {
    return new Date();
  }
}
