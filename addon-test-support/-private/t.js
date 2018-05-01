export default function(owner, ...args) {
  const intl = owner.lookup('service:intl');

  return intl.t(...args);
}
