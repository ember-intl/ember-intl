import { get, defineProperty } from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default class IntlComputedProperty extends ComputedProperty {
  constructor(...dependentKeysAndGetterFn) {
    const getterFn = dependentKeysAndGetterFn.pop();
    const dependentKeys = dependentKeysAndGetterFn;

    super(function(propertyKey) {
      let intl = get(this, 'intl');

      assert(`ember-intl: Could not look up 'intl' service for the property '${propertyKey}' on '${this}'.`, intl);

      return getterFn.call(this, intl, propertyKey, this);
    });

    this.property('intl.locale', ...dependentKeys);
    this.readOnly();
  }

  setup(proto) {
    if (super.setup) {
      super.setup(...arguments);
    }

    if (!('intl' in proto)) {
      // Implicitly inject the `intl` service, if it is not already injected.
      // This allows the computed property to depend on `intl.locale`.
      defineProperty(proto, 'intl', service('intl'));
    }
  }
}
