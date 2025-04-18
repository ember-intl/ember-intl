import { hash } from '@ember/helper';
import { t } from 'ember-intl';

<template>
  <div data-test-output="Translation with Arguments">
    <div>
      {{t
        "components.translation-with-arguments.message"
        name="Sonja"
        numPhotos=12
      }}
    </div>

    <div>
      {{t
        "components.translation-with-arguments.message"
        name="Chris"
        numPhotos=0
      }}
    </div>

    <div>
      {{#let (hash name="Maki" numPhotos=1) as |user|}}
        {{t "components.translation-with-arguments.message" user}}
      {{/let}}
    </div>
  </div>
</template>
