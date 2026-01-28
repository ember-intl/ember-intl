/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { getOwner } from '@ember/application';

// https://github.com/yapplabs/ember-wormhole/blob/0.6.0/addon/utils/dom.js#L45-L63
/**
 * @private
 * @hide
 */
export function getDOM(context: unknown):
  | {
      documentElement: Element;
    }
  | undefined {
  // @ts-expect-error: Property 'renderer' does not exist on type 'unknown'.
  let { renderer } = context;

  // Pre-glimmer 2
  if (!renderer || !renderer._dom) {
    // @ts-expect-error: 'context' is of type 'unknown'.
    const container = getOwner ? getOwner(context) : context.container;
    const document = container.lookup('service:-document');

    if (document) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return document;
    }

    renderer = container.lookup('renderer:-dom');
  }

  // Pre-Ember 2.6
  if (renderer._dom && renderer._dom.document) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return renderer._dom.document;
  }

  return undefined;
}
