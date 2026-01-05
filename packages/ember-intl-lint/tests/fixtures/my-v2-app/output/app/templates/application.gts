import type { TOC } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { NavigationNarrator } from 'ember-a11y-refocus';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { NavigationMenu } from 'my-addon';

import styles from './application.module.css';

interface ApplicationSignature {
  Args: {
    controller: unknown;
    model: unknown;
  };
}

<template>
  {{pageTitle (t "routes.application.app-name")}}

  <div class={{styles.application}}>
    <header class={{styles.header}}>
      <NavigationNarrator
        @navigationText={{t "routes.application.navigation-text"}}
        @skipText={{t "routes.application.skip-text"}}
        @skipTo="#main-content"
      />

      <NavigationMenu
        @menuItems={{array
          (hash
            label=(t "routes.application.navigation-menu.routes.index")
            route="index"
          )
          (hash
            label=(t "routes.application.navigation-menu.routes.form")
            route="form"
          )
          (hash
            label=(t "routes.application.navigation-menu.routes.products")
            route="products"
          )
        }}
        @name={{t "routes.application.navigation-menu.name"}}
      />
    </header>

    <main class={{styles.main}}>
      <div class={{styles.center}}>
        {{outlet}}
      </div>
    </main>

    <footer class={{styles.footer}}>
      <span class={{styles.copyright}}>
        {{t "routes.application.copyright" htmlSafe=true}}
      </span>
    </footer>
  </div>
</template> satisfies TOC<ApplicationSignature>;
