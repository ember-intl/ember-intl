import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import Application from 'my-v2-app-with-fallbacks/app';
import config from 'my-v2-app-with-fallbacks/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

export function start(): void {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
