import type { TOC } from '@ember/components/template-only';
import { formatDate } from 'ember-intl';

interface ExampleFormatDateAllowEmptySignature {
  Args: {
    message?: {
      status: string;
      timestamp: string;
    };
  };
}

const ExampleFormatDateAllowEmpty: TOC<ExampleFormatDateAllowEmptySignature> = <template>
  {{formatDate @message.timestamp allowEmpty=true}}
</template>

export default ExampleFormatDateAllowEmpty;
