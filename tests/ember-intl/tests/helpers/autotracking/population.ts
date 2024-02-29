import { inject as service, type Registry as Services } from '@ember/service';

export class Population {
  @service declare intl: Services['intl'];

  get data() {
    return {
      censusDate: new Date('2020-01-01'),
      city: 'Atlanta',
      population: 5475213,
    };
  }

  get description(): string {
    switch (this.intl.primaryLocale) {
      case 'de-de': {
        return '{city} hat eine Bevölkerung von {population, number, integer} zum {censusDate, date, long}.';
      }

      case 'en-us': {
        return '{city} has a population of {population, number, integer} as of {censusDate, date, long}.';
      }
    }

    throw new Error('Locale must be de-de or en-us.');
  }
}
