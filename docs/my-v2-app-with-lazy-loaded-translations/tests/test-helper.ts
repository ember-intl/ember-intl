import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import Application from 'my-v2-app-with-lazy-loaded-translations/app';
import config from 'my-v2-app-with-lazy-loaded-translations/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
