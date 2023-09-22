import { getPostsByType, getPostByType } from 'lib/api';

import ArticlePage from 'layouts/article';
import Layout from 'layouts/layout';

import { articlesFilter } from 'utils/articles-filter';

import { getPublishedNotifications } from 'utils/notifications';

export default function Article(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} page={props?.article}>
      <ArticlePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params, previewData, preview }) {
  const isPreview = !!preview;
  const article = await getPostByType({
    type: 'additional_materials',
    slug: params.slug,
    ...articlesFilter(isPreview, previewData),
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
    type: 'additional_materials',
    params: { per_page: 100 },
  });

  const articlesWithoutTax = allArticles.filter((a) => !a?.help_tools?.length);
  const paths = articlesWithoutTax?.map(
    (article) => `/additional_materials/${article.slug}/`
  );

  return {
    paths: paths || [],
    fallback: true,
  };
}
