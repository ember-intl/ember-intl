const { assign } = Object;
const hasOwnProperty = Object.prototype.hasOwnProperty;

function isObject(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export default function merge(to, from) {
  if (!isObject(to) || !isObject(from)) {
    return;
  }

  for (let key in from) {
    if (isObject(from[key])) {
      if (!hasOwnProperty.call(to, key)) {
        assign(to, { [key]: {} });
      }

      merge(to[key], from[key]);
    } else {
      assign(to, { [key]: from[key] });
    }
  }
}
