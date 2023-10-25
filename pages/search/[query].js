import Head from 'next/head';

import { getPostsByType } from 'lib/api';

import dynamic from 'next/dynamic';

import ArchivePage from 'layouts/archive';

import { searchFilter } from 'utils/articles-filter';

import { getPublishedNotifications } from 'utils/notifications';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Search(props) {
  return (
    <Layout {...props} noIndex>
      <Head>
        <title>Search | Help Center | Global Forest Watch</title>
        <meta
          name="description"
          content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
        />
      </Head>
      <ArchivePage {...props} isSearch />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const articles = await getPostsByType({
    type: 'articles',
    ...searchFilter(params),
    allLanguages: true,
  });

  const webinars = await getPostsByType({
    type: 'webinars',
    ...searchFilter(params),
    allLanguages: true,
  });

  const additionalMaterials = await getPostsByType({
    type: 'additional-materials',
    ...searchFilter(params),
    allLanguages: true,
  });

  const notifications = await getPublishedNotifications();

  return {
    props: {
      articles: articles || [],
      webinars: webinars || [],
      additionalMaterials: additionalMaterials || [],
      notifications: notifications || [],
    },
  };
}
