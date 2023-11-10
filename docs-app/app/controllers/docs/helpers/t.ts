import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DocsHelpersTController extends Controller {
  @tracked numPhotos = 0;

  @action addPhoto(): void {
    this.numPhotos++;
  }

  @action deletePhoto(): void {
    if (this.numPhotos === 0) {
      return;
    }

    this.numPhotos--;
  }
}
