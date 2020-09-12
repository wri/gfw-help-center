import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from '@emotion/styled';

import { Loader } from 'gfw-components';

import { getPostsByType, getPostByType } from 'lib/api';

import ArticlePage from 'layouts/article';

import Layout from 'components/layout';

export default function Article(props) {
  const router = useRouter();
  // eslint-disable-next-line react/prop-types
  if (!router.isFallback && !props?.article) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout {...props}>
      {router.isFallback ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <Head>
            <title>
              How to Use Global Forest Watch Maps & Tools | GFW Help Center
            </title>
            <meta
              name="description"
              content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
            />
          </Head>
          <ArticlePage {...props} />
        </>
      )}
    </Layout>
  );
}

const LoaderWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

export async function getStaticProps({ params }) {
  const article = await getPostByType({
    type: 'articles',
    slug: params.slug,
  });

  return {
    props: {
      article,
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
