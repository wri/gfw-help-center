import { getTags, getTagBySlug, getPostsByType } from 'lib/api';

import dynamic from 'next/dynamic';

import ArchivePage from 'layouts/archive';

import { getPublishedNotifications } from 'utils/notifications';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Tag(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props}>
      <ArchivePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const tags = await getTags();
  const tag = await getTagBySlug({ slug: params.tag });

  const articles = await getPostsByType({
    type: 'articles',
    params: {
      help_tags: tag?.id,
    },
  });

  const webinars = await getPostsByType({
    type: 'webinars',
    params: {
      help_tags: tag?.id,
    },
  });

  const additionalMaterials = await getPostsByType({
    type: 'additional-materials',
    params: {
      help_tags: tag?.id,
    },
  });

  const notifications = await getPublishedNotifications();

  return {
    props: {
      tag: tag || null,
      tags: tags || [],
      articles: articles || [],
      webinars: webinars || [],
      additionalMaterials: additionalMaterials || [],
      metaTags: tag?.yoast_head || '',
      isError: !tag,
      notifications: notifications || [],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allTags = await getTags();

  const paths = allTags?.map((tag) => `/tag/${tag.slug}/`);

  return {
    paths: paths || [],
    fallback: true,
  };
}
