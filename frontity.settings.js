import { config } from 'dotenv';

config();

const settings = {
  name: 'gfw-help-center',
  match: ['https://www.globalforestwatch.org/help-center'],
  state: {
    frontity: {
      url: 'https://www.globalforestwatch.org/help-center',
      title: 'Help Center | Global Forest Watch',
      description:
        'Learn how to better manage, protect and restore forest landscapes. The Global Forest Watch help center offers resources to help guide you through its forest monitoring data, technology and tools.',
    },
  },
  packages: [
    {
      name: '@gfw/help-center-theme',
      state: {
        theme: {
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: '@frontity/wp-source',
      state: {
        source: {
          api: `${process.env.WORDPRESS_API_URL}/wp-json`,
          postEndpoint: 'tools',
          postTypes: [
            {
              type: 'tools', // type slug
              endpoint: 'tools', // REST API endpoint
              archive: '/', // link where this custom posts are listed
            },
            {
              type: 'faqs', // type slug
              endpoint: 'faqs', // REST API endpoint
              archive: '/faqs', // link where this custom posts are listed
            },
            {
              type: 'articles', // type slug
              endpoint: 'articles', // REST API endpoint
              archive: '/articles', // link where this custom posts are listed
            },
            {
              type: 'webinars', // type slug
              endpoint: 'webinars', // REST API endpoint
              archive: '/webinars', // link where this custom posts are listed
            },
          ],
        },
      },
    },
    '@frontity/tiny-router',
    '@frontity/html2react',
    '@frontity/google-analytics',
  ],
};

export default settings;
