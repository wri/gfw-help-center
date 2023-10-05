import { getPostsByType, getPostByType } from 'lib/api';

import dynamic from 'next/dynamic';

import ArticlePage from 'layouts/article';

import { articlesFilter } from 'utils/articles-filter';
import { getPublishedNotifications } from 'utils/notifications';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Article(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} page={props?.article}>
      <ArticlePage {...props} isGuide />
    </Layout>
  );
}

export async function getStaticProps({ params, previewData, preview }) {
  const isPreview = !!preview;
  const article = await getPostByType({
    type: 'articles',
    ...articlesFilter(isPreview, previewData),
    slug: params.slug,
  });
  const notifications = await getPublishedNotifications();

  return {
    props: {
      article: article || null,
      metaTags: article?.yoast_head || '',
      isError: !article,
      preview: isPreview,
      notifications: notifications || [],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allArticles = await getPostsByType({
    type: 'articles',
    params: { per_page: 100 },
  });

  const articlesWithoutTax = allArticles.filter((a) => !a?.help_tools?.length);
  const paths = articlesWithoutTax?.map(
    (article) => `/guides/${article.slug}/`
  );

  return {
    paths: paths || [],
    fallback: true,
  };
}
