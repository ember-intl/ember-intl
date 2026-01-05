import Controller from '@ember/controller';
import { getOwner } from '@ember/owner';
import { ContactMe } from 'my-v2-app/utils/controllers/form';

export default class FormController extends Controller {
  contactMe = new ContactMe(getOwner(this)!);
}
