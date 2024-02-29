import { tracked } from '@glimmer/tracking';

export class User {
  @tracked _name = 'Zoey';

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}
