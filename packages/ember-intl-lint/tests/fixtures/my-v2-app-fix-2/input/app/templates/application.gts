import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle (t "routes.application.title")}}

  {{outlet}}
</template>
