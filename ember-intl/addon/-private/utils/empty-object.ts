/**
 * @private
 * @hide
 */
const proto = Object.create(null, {
  constructor: {
    value: undefined,
    enumerable: false,
    writable: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
function EmptyObject() {}
EmptyObject.prototype = proto;

/**
 * @private
 * @hide
 */
export default EmptyObject as unknown as { new (): Record<string, unknown> };
