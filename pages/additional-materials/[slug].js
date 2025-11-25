import { getPostsByType, getPostByType } from 'lib/api';

import dynamic from 'next/dynamic';

import ArticlePage from 'layouts/article';

import { articlesFilter } from 'utils/articles-filter';

import { getPublishedNotifications } from 'utils/notifications';
import { convertTool } from 'utils/tools';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

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

  const tools = await getPostsByType({
    type: 'tools',
    params: {
      per_page: 100,
      order: 'asc',
      orderby: 'menu_order',
      status: 'publish, private',
    },
  });

  const toolsMapped = tools?.map((tool) => ({
    ...convertTool(tool),
  }));

  return {
    props: {
      article: article || null,
      metaTags: article?.yoast_head || '',
      isError: !article,
      preview: isPreview,
      notifications: notifications || [],
      toolsMapped: toolsMapped || [],
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
