import Controller from '@ember/controller';

const date = new Date();
const yesterday = date.setDate(date.getDate() - 1);

export default Controller.extend({
  num: 1000,
  yesterday: yesterday,
  instant: new Date(),
  now: new Date()
});
