/**
 * Removes any nested object field that is null recursively
 *
 * stripNestedNulls({ a: {b: null, c: 'c'}, d: null }) => {a: {c: 'c'}}
 *
 * @method stripNestedNulls
 * @param {Object} object
 * @return {Object} Returns the input object
 * @private
 */
function stripNestedNulls(object) {
  Object.keys(object).forEach((key) => {
    const keyValue = object[key];

    // check for null first as null is also typeof 'object'
    if (keyValue === null) {
      delete object[key];
    } else if (typeof keyValue === 'object') {
      stripNestedNulls(object[key]);
    }
  });

  return object;
}

module.exports = stripNestedNulls;
