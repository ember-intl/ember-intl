import { formatTime } from 'ember-intl';

const ExampleFormatTimeAllowEmpty = <template>
  {{formatTime @message.timestamp allowEmpty=true}}
</template>

export default ExampleFormatTimeAllowEmpty;
