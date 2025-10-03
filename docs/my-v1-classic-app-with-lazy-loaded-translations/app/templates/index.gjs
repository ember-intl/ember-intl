import { t } from 'ember-intl';
import { ComponentFromV1Addon } from 'my-v1-addon';
import ComponentFromApp from 'my-v1-classic-app-with-lazy-loaded-translations/components/component-from-app';
import TranslationWithArguments from 'my-v1-classic-app-with-lazy-loaded-translations/components/translation-with-arguments';
import { ComponentFromV2Addon } from 'my-v2-addon';

<template>
  <div>
    <h1 data-test-output="Title">
      {{t "routes.index.title" htmlSafe=true}}
    </h1>

    <section class="section">
      <h2 data-test-header="Translation with Arguments">
        {{t "components.translation-with-arguments.title"}}
      </h2>

      <TranslationWithArguments />
    </section>

    <section class="section">
      <h2 data-test-header="Components">
        {{t "components.title"}}
      </h2>

      <ComponentFromApp />
      <ComponentFromV1Addon />
      <ComponentFromV2Addon />
    </section>

    <section class="section" data-test-output="Key Missing">
      {{t "routes.index.key-without-translation"}}
    </section>

    <section class="section" data-test-output="Key Overwritten">
      {{@controller.overwrittenTranslation}}
    </section>
  </div>
</template>
