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

function EmptyObject() {}
EmptyObject.prototype = proto;

/**
 * @private
 * @hide
 */
export default EmptyObject;
