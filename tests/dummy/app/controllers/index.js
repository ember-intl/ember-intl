import Controller from '@ember/controller';

const date = new Date();
const yesterday = date.setDate(date.getDate() - 1);

export default class IndexController extends Controller {
  num = 1000;
  yesterday = yesterday;
  instant = new Date();
  now = new Date();
}
