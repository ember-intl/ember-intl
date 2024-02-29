/**
 * Removes nested translations that are empty recursively (`null` or `""`)
 *
 * stripEmptyTranslations({ a: { b: null, c: 'c' }, d: '' }) => { a: { c: 'c' } }
 *
 * @method stripEmptyTranslations
 * @param {Object} object
 * @param {String} [objectKey]
 * @param {Object} [objectParent]
 * @return {Object} Returns the input object
 * @private
 */
function stripEmptyTranslations(object, objectKey, objectParent) {
  Object.keys(object).forEach((key) => {
    const keyValue = object[key];

    if (keyValue === null || keyValue === '') {
      delete object[key];

      const isObjectEmpty = Object.keys(object).length === 0;

      if (isObjectEmpty && objectParent) {
        delete objectParent[objectKey];
      }
    } else if (typeof keyValue === 'object') {
      stripEmptyTranslations(object[key], key, object);
    }
  });

  return object;
}

module.exports = stripEmptyTranslations;
