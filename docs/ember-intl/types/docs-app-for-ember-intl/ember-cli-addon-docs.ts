/* eslint-disable @typescript-eslint/ban-types */
import type { ComponentLike } from '@glint/template';

type DocsHeaderComponent = ComponentLike<{
  Args: {};
}>;

type DocsKeyboardShortcutsComponent = ComponentLike<{
  Args: {};
}>;

type DocsLinkComponent = ComponentLike<{
  Args: {
    Named: {
      route: string;
    };
  };
  Blocks: {
    default: [];
  };
}>;

type DocsViewerXMainComponent = ComponentLike<{
  Args: {};
  Blocks: {
    default: [];
  };
}>;

type DocsViewerXNavComponent = ComponentLike<{
  Args: {};
  Blocks: {
    default: [
      {
        item: ComponentLike<{
          Args: {
            label: string;
            route: string;
          };
        }>;
        section: ComponentLike<{
          Args: {
            label: string;
          };
        }>;
      },
    ];
  };
}>;

type DocsViewerComponent = ComponentLike<{
  Args: {};
  Blocks: {
    default: [
      {
        main: DocsViewerXMainComponent;
        nav: DocsViewerXNavComponent;
      },
    ];
  };
}>;

export default interface EmberCliAddonDocsRegistry {
  DocsHeader: DocsHeaderComponent;
  DocsKeyboardShortcuts: DocsKeyboardShortcutsComponent;
  DocsLink: DocsLinkComponent;
  DocsViewer: DocsViewerComponent;
}
