import { computed, get, defineProperty } from '@ember/object';
import { inject as service } from '@ember/service';

export const __intlInjectionName = `intl-${Date.now().toString(36)}`;

export default function intl(...dependentKeysAndGetterFn) {
  const getterFn = dependentKeysAndGetterFn.pop();
  const dependentKeys = dependentKeysAndGetterFn;

  return computed(function(propertyKey) {
    if (!get(this, __intlInjectionName)) {
      defineProperty(this, __intlInjectionName, service('intl'));
      Object.defineProperty(
        this,
        __intlInjectionName,
        Object.assign(Object.getOwnPropertyDescriptor(this, __intlInjectionName), { enumerable: false })
      );
    }
    const intl = get(this, __intlInjectionName);
    return getterFn.call(this, intl, propertyKey, this);
  })
    .readOnly()
    .property(`${__intlInjectionName}.locale`, ...dependentKeys);
}
