import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from 'my-classic-app-with-lazy-loaded-translations/app';
import config from 'my-classic-app-with-lazy-loaded-translations/config/environment';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
