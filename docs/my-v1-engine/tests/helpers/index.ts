import type EngineInstance from '@ember/engine/instance';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import {
  type EnginesTestContext,
  setupEngine,
  // @ts-expect-error: Cannot find module 'ember-engines/test-support' or its corresponding type declarations.
} from 'ember-engines/test-support';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';

function setupApplicationTest(
  hooks: NestedHooks,
  options?: SetupTestOptions,
): void {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
}

function setupRenderingTest(
  hooks: NestedHooks,
  options?: SetupTestOptions,
): void {
  upstreamSetupRenderingTest(hooks, options);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setupEngine(hooks, 'my-v1-engine');

  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
}

export { setupApplicationTest, setupRenderingTest, setupTest };

export interface RenderingTestContext
  extends BaseTestContext, EnginesTestContext {
  engine: EngineInstance;
}
