const fetch = require('node-fetch');
const btoa = require('btoa');

module.exports = {
  basePath: '/help',
  assetPrefix: '/help',
  images: {
    domains: [
      'dev-global-forest-watch-blog.pantheonsite.io',
      'test-global-forest-watch-blog.pantheonsite.io',
      'content.globalforestwatch.org',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: { removeViewBox: false } } },
        },
      ],
    });

    return config;
  },
  trailingSlash: true,
  async redirects() {
    const userPassword = btoa(
      `${process.env.NEXT_PUBLIC_AUTH_USER}:${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
    );
    const fetchConfig = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${userPassword}`,
      },
    };

    let allRedirects = [];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/redirection/v1/redirect?per_page=5&filterBy[status]=enabled&filterBy[url]=/help/`,
        fetchConfig
      );
      const json = await response.json();
      const totalPages = Math.ceil(parseInt(json.total, 10) / 50);
      const redirectPages = await Promise.all(
        Array.from(Array(totalPages).keys()).map((page) =>
          fetch(
            `${
              process.env.NEXT_PUBLIC_WORDPRESS_URL
            }/redirection/v1/redirect?per_page=50&page=${
              page + 1
            }&filterBy[status]=enabled&filterBy[url]=/help/`,
            fetchConfig
          )
        )
      );
      const allResponses = await Promise.all(
        redirectPages.map((res) => res.json())
      );

      allRedirects = allResponses.reduce(
        (arr, res) => [...arr, ...res.items],
        []
      );
    } catch (e) {
      throw new Error(
        `Wordpress initial request failed, check your credentials \n${e.name}: ${e.message}`
      );
    }

    return allRedirects.map((r) => ({
      source: `${r.url}/`,
      destination: `${r.action_data.url}/`,
      permanent: true,
    }));
  },
};
