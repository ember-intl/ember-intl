/**
 * @private
 * @hide
 */
export default function (localeName: string): string | void {
  if (typeof localeName === 'string') {
    return localeName.replace(/_/g, '-').toLowerCase();
  }
}
