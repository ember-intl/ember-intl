import { computed, get, defineProperty } from '@ember/object';
import { getOwner } from '@ember/application';

export const __intlInjectionName = `intl-${Date.now().toString(36)}`;

export default function intl(...dependentKeysAndGetterFn) {
  const getterFn = dependentKeysAndGetterFn.pop();
  const dependentKeys = dependentKeysAndGetterFn;

  return computed(`${__intlInjectionName}.locale`, ...dependentKeys, function(propertyKey) {
    if (!get(this, __intlInjectionName)) {
      defineProperty(this, __intlInjectionName, {
        value: getOwner(this).lookup('service:intl'),
        enumerable: false
      });
    }
    const intl = get(this, __intlInjectionName);
    return getterFn.call(this, intl, propertyKey, this);
  }).readOnly();
}
