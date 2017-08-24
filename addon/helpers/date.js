import Helper from '@ember/component/helper';

export function toDate([value]) {
  return new Date(value);
}

export default Helper.helper(toDate);
