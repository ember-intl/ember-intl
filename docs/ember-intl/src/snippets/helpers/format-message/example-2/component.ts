import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get descriptor() {
    return {
      defaultMessage: '<em>{numPhotos, number} photos taken.</em>',
      description: 'A short summary of the photoshoot from this week',
      id: 'photoshoot-short-summary',
    };
  }
}
