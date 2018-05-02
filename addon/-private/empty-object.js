const proto = Object.create(null, {
  constructor: {
    value: undefined,
    enumerable: false,
    writable: true
  }
});

function EmptyObject() {}
EmptyObject.prototype = proto;

export default EmptyObject;
