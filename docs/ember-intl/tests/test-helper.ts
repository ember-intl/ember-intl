import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app-for-ember-intl/app';
import config from 'docs-app-for-ember-intl/config/environment';
import { setupEmberOnerrorValidation, start } from 'ember-qunit';
import { loadTests } from 'ember-qunit/test-loader';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);
setupEmberOnerrorValidation();
loadTests();
start();
