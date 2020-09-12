import { getPostsByType, getPostByType } from 'lib/api';

import ArticlePage from 'layouts/article';
import Layout from 'components/layout';

export default function Article(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} hasPageData={!!props.article}>
      <ArticlePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const article = await getPostByType({
    type: 'articles',
    slug: params.slug,
  });

  return {
    props: {
      article,
      metaTags: article.yoast_head,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allArticles = await getPostsByType({
    type: 'articles',
    params: { per_page: 100 },
  });

  const paths = allArticles?.map((article) => `/help/guides/${article.slug}/`);

  return {
    paths: paths || [],
    fallback: true,
  };
}
