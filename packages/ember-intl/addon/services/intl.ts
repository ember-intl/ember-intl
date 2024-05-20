import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IntlService extends Service {
  @tracked private _intls: Record<string, unknown> = {};
  @tracked private _locale?: string[];

  private _formats?: Record<string, unknown>;

  get locales(): string[] {
    return Object.keys(this._intls);
  }

  get primaryLocale(): string | undefined {
    if (!this._locale) {
      return;
    }

    return this._locale[0];
  }

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    if (!this._formats) {
      // @ts-expect-error: Property 'resolveRegistration' does not exist on type 'Owner'
      this._formats = getOwner(this).resolveRegistration('formats:main') ?? {};
    }
  }

  willDestroy() {
    super.willDestroy();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
