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
              type: 'help', // type slug
              endpoint: 'tools', // REST API endpoint
              archive: '/help', // link where this custom posts are listed
            },
            {
              type: 'help/step-by-step-instructions', // type slug
              endpoint: 'articles', // REST API endpoint
              archive: '/step-by-step-instructions', // link where this custom posts are listed
            },
            {
              type: 'help/webinars', // type slug
              endpoint: 'webinars', // REST API endpoint
              archive: '/webinars', // link where this custom posts are listed
            },
          ],
          taxonomies: [
            {
              taxonomy: 'help/tag', // taxonomy slug
              endpoint: 'help_tags', // REST API endpoint
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
