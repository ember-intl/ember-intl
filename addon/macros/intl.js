import { computed, get, defineProperty } from '@ember/object';
import { inject as service } from '@ember/service';

export default function intl(...dependentKeysAndGetterFn) {
  const getterFn = dependentKeysAndGetterFn.pop();
  const dependentKeys = dependentKeysAndGetterFn;
  const intlInjectionName = `intl-${Date.now().toString(36)}`;

  return computed(function(propertyKey) {
    if (!get(this, intlInjectionName)) {
      defineProperty(this, intlInjectionName, service('intl'));
      Object.defineProperty(
        this,
        intlInjectionName,
        Object.assign(Object.getOwnPropertyDescriptor(this, intlInjectionName), { enumerable: false })
      );
    }
    const intl = get(this, intlInjectionName);
    return getterFn.call(this, intl, propertyKey, this);
  })
    .readOnly()
    .property(`${intlInjectionName}.locale`, ...dependentKeys);
}
