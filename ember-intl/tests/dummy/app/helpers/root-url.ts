import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';

export default class RootUrl extends Helper {
  build(relativeURL: string): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Property `resolveRegistration` does not exist on type `Owner`
    const ENV = getOwner(this).resolveRegistration('config:environment');

    return `${ENV.rootURL}${relativeURL.replace(/^\//, '')}`;
  }

  compute([relativeURL]: [string]) {
    return this.build(relativeURL);
  }
}
