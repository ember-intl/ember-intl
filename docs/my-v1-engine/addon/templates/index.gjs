import { t } from 'ember-intl';
import ComponentFromV1Engine from 'my-v1-engine/components/component-from-v1-engine';

<template>
  <div>
    <h1 data-test-output="Title">
      {{t "routes.my-v1-engine.index.title" htmlSafe=true}}
    </h1>

    <section class="section">
      <h2 data-test-header="Components">
        {{t "components.title"}}
      </h2>

      <ComponentFromV1Engine />
    </section>

    <section class="section" data-test-output="Key Missing">
      {{t "routes.index.key-without-translation"}}
    </section>

    <section class="section" data-test-output="Key Overwritten">
      {{@controller.overwrittenTranslation}}
    </section>
  </div>
</template>
