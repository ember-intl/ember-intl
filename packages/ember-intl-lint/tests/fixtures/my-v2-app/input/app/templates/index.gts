import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';
import { UiPage } from 'my-addon';

interface IndexSignature {
  Args: {
    controller: unknown;
    model: unknown;
  };
}

<template>
  <UiPage @title={{t "routes.index.title"}}>
    <p>
      {{t "routes.index.description" htmlSafe=true}}
    </p>
  </UiPage>
</template> satisfies TOC<IndexSignature>;
