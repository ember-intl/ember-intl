import Service from '@ember/service';

export default class IntlService extends Service {}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
