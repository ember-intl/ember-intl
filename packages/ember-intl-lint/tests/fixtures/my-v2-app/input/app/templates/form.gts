import type { TOC } from '@ember/component/template-only';
import perform from 'ember-concurrency/helpers/perform';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiForm, UiPage } from 'my-addon';
import type FormController from 'my-v2-app/controllers/form';
import type { Model } from 'my-v2-app/routes/form';

import styles from './form.module.css';

interface FormSignature {
  Args: {
    controller: FormController;
    model: Model;
  };
}

<template>
  {{pageTitle (t "routes.form.title")}}

  <UiPage @title={{t "routes.form.title"}}>
    <UiForm
      @data={{@controller.contactMe.initialData}}
      @instructions={{t "routes.form.contact-me-form.instructions"}}
      @onSubmit={{perform @controller.contactMe.submitData}}
      @title={{t "routes.form.contact-me-form.title"}}
      as |F|
    >
      <div class={{styles.field}}>
        <F.Input
          @isRequired={{true}}
          @key="name"
          @label={{t "routes.form.contact-me-form.fields.name.label"}}
          @placeholder={{t
            "routes.form.contact-me-form.fields.name.placeholder"
          }}
        />
      </div>

      <div class={{styles.field}}>
        <F.Input
          @isRequired={{true}}
          @key="email"
          @label={{t "routes.form.contact-me-form.fields.email.label"}}
          @placeholder={{t
            "routes.form.contact-me-form.fields.email.placeholder"
          }}
          @type="email"
        />
      </div>

      <div class={{styles.field}}>
        <F.Textarea
          @key="message"
          @label={{t "routes.form.contact-me-form.fields.message.label"}}
        />
      </div>

      {{#if @controller.contactMe.showSubscribe}}
        <div class={{styles.field}}>
          <F.Checkbox
            @key="subscribe"
            @label={{t "routes.form.contact-me-form.fields.subscribe.label"}}
          />
        </div>
      {{else}}
        <div class={{styles.field}}>
          <F.Number
            @key="donation"
            @label={{t "routes.form.contact-me-form.fields.donation.label"}}
            @minValue={{0}}
            @placeholder={{t
              "routes.form.contact-me-form.fields.donation.placeholder"
            }}
            @step={{10}}
          />
        </div>
      {{/if}}
    </UiForm>
  </UiPage>
</template> satisfies TOC<FormSignature>;
