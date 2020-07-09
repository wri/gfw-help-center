import iframe from '@frontity/html2react/processors/iframe';

import Theme from './app';
import { allToolsHandler, topTagsHandler } from './handlers';

const gfwHelpCenter = {
  name: '@gfw/help-center-theme',
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      title: 'Help Center | Global Forest Watch',
      description:
        'Learn how to better manage, protect and restore forest landscapes. The Global Forest Watch help center offers resources to help guide you through its forest monitoring data, technology and tools.',
      metaTitle:
        'How to Use Global Forest Watch Maps & Tools | GFW Help Center',
      metaDescription:
        'Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers.',
      isContactUsOpen: false,
      searchIsActive: false,
      lang: 'en_US',
    },
    googleAnalytics: {
      trackingId: 'UA-48182293-1',
    },
  },
  actions: {
    theme: {
      toggleContactUsModal: ({ state }) => {
        state.theme.isContactUsOpen = !state.theme.isContactUsOpen;
      },
      setSearchOpen: ({ state }) => (open) => {
        state.theme.searchIsActive = open;
      },
      beforeSSR: ({ actions }) => async () => {
        await actions.source.fetch('all-tools');
        await actions.source.fetch('top-tags');
      },
    },
  },
  libraries: {
    html2react: {
      processors: [iframe],
    },
    source: {
      handlers: [allToolsHandler, topTagsHandler],
    },
  },
};

export default gfwHelpCenter;
