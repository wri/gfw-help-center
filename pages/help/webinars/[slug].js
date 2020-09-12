import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import styled from '@emotion/styled';

import { Loader } from 'gfw-components';

import { getPostsByType, getPostByType } from 'lib/api';

import WebinarPage from 'layouts/webinar';

import Layout from 'components/layout';

export default function Webinar(props) {
  const router = useRouter();
  // eslint-disable-next-line react/prop-types
  if (!router.isFallback && !props?.webinar) {
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
          <WebinarPage {...props} />
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
  const webinar = await getPostByType({
    type: 'webinars',
    slug: params.slug,
  });

  return {
    props: {
      webinar,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allWebinars = await getPostsByType({
    type: 'webinars',
    params: { per_page: 100 },
  });

  const paths = allWebinars?.map(
    (webinar) => `/help/webinars/${webinar.slug}/`
  );

  return {
    paths: paths || [],
    fallback: true,
  };
}
