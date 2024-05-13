import { setApplication } from '@ember/test-helpers';
import Application from 'dummy/app';
import manifest from 'dummy/config/asset-manifest';
import config from 'dummy/config/environment';
// @ts-expect-error: Cannot find module 'ember-asset-loader/test-support/preload-assets' or its corresponding type declarations.
import preloadAssets from 'ember-asset-loader/test-support/preload-assets';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

preloadAssets(manifest).then(() => {
  start();
});
