const proto = Object.create(null, {
  constructor: {
    value: undefined,
    enumerable: false,
    writable: true
  }
});

class EmptyObject {
  [key: string]: any;
}
EmptyObject.prototype = proto;

/**
 * @private
 * @hide
 */
export default EmptyObject;
