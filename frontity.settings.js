import { config } from 'dotenv';

config();

const settings = {
  name: 'gfw-help-center',
  state: {
    frontity: {
      url: 'https://www.globalforestwatch.org/help-center',
    },
  },
  packages: [
    {
      name: '@gfw/help-center-theme',
    },
    {
      name: '@frontity/wp-source',
      state: {
        source: {
          api: `${process.env.WORDPRESS_API_URL}/wp-json`,
          postTypes: [
            {
              type: '/help-center', // type slug
              endpoint: 'tools', // REST API endpoint
              archive: '/', // link where this custom posts are listed
            },
            {
              type: 'faqs', // type slug
              endpoint: 'faqs', // REST API endpoint
              archive: '/faqs', // link where this custom posts are listed
            },
            {
              type: '(.*)?/step-by-step-instructions', // type slug
              endpoint: 'articles', // REST API endpoint
              archive: '/step-by-step-instructions', // link where this custom posts are listed
            },
            {
              type: 'webinars', // type slug
              endpoint: 'webinars', // REST API endpoint
              archive: '/webinars', // link where this custom posts are listed
            },
          ],
          taxonomies: [
            {
              taxonomy: 'tool_cats', // taxonomy slug
              endpoint: 'tool_cats', // REST API endpoint
              postTypeEndpoint: 'articles', // endpoint from which posts from this taxonomy are fetched
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
