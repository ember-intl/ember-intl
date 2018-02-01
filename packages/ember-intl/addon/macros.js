import Ember from 'ember';

const { get, assert, computed } = Ember;
const keys = Object.keys;

function extractDependencies(obj) {
  return keys(obj)
    .map(key => obj[key])
    .filter(value => value.isReference)
    .map(it => it.key);
}

function resolve(context, value) {
  return value.isReference ? get(context, value.key) : value;
}

function resolveHash(context, hash) {
  let result = {};

  keys(hash).forEach(function(key) {
    result[key] = resolve(context, hash[key]);
  });

  return result;
}

export function raw(value) {
  return { value, isRaw: true };
}

export function ref(key) {
  return { key, isReference: true };
}

/**
 * Creates a computed property that calls `intl.formatNumber()`
 *
 * @param ref name of another property on the object (or a number wrapped with `raw()`)
 * @param options static options hash (use `ref()` to reference other properties on the object)
 */
export function formatNumber(ref, options) {
  let hash = options || Object.create(null);
  let dependentKeys = extractDependencies(hash);
  if (!ref.isRaw) {
    dependentKeys.push(ref);
  }
  dependentKeys.push('intl.locale');

  return computed(...dependentKeys, function() {
    let intl = get(this, 'intl');
    assert(`${this} does not have an 'intl' property set. Try: intl: Ember.inject.service()`, intl);

    let number = ref.isRaw ? ref.value : get(this, ref);
    let options = resolveHash(this, hash);
    return intl.formatNumber(number, options);
  }).readOnly();
}
