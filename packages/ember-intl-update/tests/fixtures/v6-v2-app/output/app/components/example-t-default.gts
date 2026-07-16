import type { TOC } from '@ember/components/template-only';
import { concat } from '@ember/helper';
import { t } from 'ember-intl';

interface ExampleTDefaultSignature {
  Args: {
    message?: {
      status: string;
      timestamp: string;
    };
  };
}

const ExampleTDefault: TOC<ExampleTDefaultSignature> = <template>
  {{t
    (concat "message.status-" @message.status)
    default="message.status-unknown"
  }}
</template>

export default ExampleTDefault;
