import { getOwner } from '@ember/application';

type SimpleDocument = {
  documentElement: HTMLHtmlElement;
};

/**
 * @private
 */
export function getHtmlElement(context: object): HTMLHtmlElement | undefined {
  const owner = getOwner(context);

  if (owner === undefined) {
    return undefined;
  }

  const documentService = owner.lookup('service:-document') as
    | SimpleDocument
    | undefined;

  return documentService?.documentElement;
}
