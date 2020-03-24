/**
 * @private
 * @hide
 */
export default function (localeName) {
  if (typeof localeName === 'string') {
    return localeName.replace(/_/g, '-').toLowerCase();
  }
}
