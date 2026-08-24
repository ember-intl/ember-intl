import type { TOC } from '@ember/components/template-only';
import { concat } from '@ember/helper';
import { t } from 'ember-intl';

interface ExampleTResilientSignature {
  Args: {
    message?: {
      status: string;
      timestamp: string;
    };
  };
}

const ExampleTResilient: TOC<ExampleTResilientSignature> = <template>
  {{t
    (concat "message.status-" @message.status)
    resilient=true
  }}
</template>

export default ExampleTResilient;
