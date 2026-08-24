import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface ExampleTSignature {
  Args: {
    name: string;
  };
}

<template>
  {{t "hello.message" name=@name}}
</template> satisfies TOC<ExampleTSignature>;
