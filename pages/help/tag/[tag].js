import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from '@emotion/styled';

import { Loader } from 'gfw-components';

import { getTags, getTagBySlug, getPostsByType } from 'lib/api';

import ArchivePage from 'layouts/archive';

import Layout from 'components/layout';

export default function Tag(props) {
  const router = useRouter();
  // eslint-disable-next-line react/prop-types
  if (!router.isFallback && !props?.tag) {
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
            <title>Tags | GFW Help Center</title>
            <meta
              name="description"
              content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
            />
          </Head>
          <ArchivePage {...props} />
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
  const tags = await getTags();
  const tag = await getTagBySlug({ slug: params.tag });

  const articles = await getPostsByType({
    type: 'articles',
    params: {
      help_tags: tag.id,
    },
  });

  const webinars = await getPostsByType({
    type: 'webinars',
    params: {
      help_tags: tag.id,
    },
  });

  return {
    props: {
      tag,
      tags,
      articles: articles || [],
      webinars: webinars || [],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allTags = await getTags();

  const paths = allTags?.map((tag) => `/help/tag/${tag.slug}/`);

  return {
    paths: paths || [],
    fallback: true,
  };
}
