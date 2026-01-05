import type Owner from '@ember/owner';
import { setOwner } from '@ember/owner';
import { type Registry as Services, service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

export class ContactMe {
  @service declare api: Services['api'];
  @service declare experiments: Services['experiments'];

  submitData = dropTask(
    async (data: Record<string, unknown>): Promise<void> => {
      await this.api.post('/contact-me', {
        data,
        type: 'contact-form',
      });
    },
  );

  get initialData(): Record<string, unknown> {
    if (this.showSubscribe) {
      return {
        email: undefined,
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: true,
      };
    }

    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
    };
  }

  get showSubscribe(): boolean {
    return this.experiments.getVariant('subscribe-to-ember-times') === 'v1';
  }

  constructor(owner: Owner) {
    setOwner(this, owner);
  }
}
