import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

import { setApplication } from '@ember/test-helpers';

import { start as qunitStart } from 'ember-qunit';

import Application from 'ember-formatjs-tests/app';
import config from 'ember-formatjs-tests/config/environment';

export function start() {
	setApplication(Application.create(config.APP));

	setup(QUnit.assert);

	qunitStart();
}
