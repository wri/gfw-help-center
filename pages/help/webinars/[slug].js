import { getPostsByType, getPostByType } from 'lib/api';

import WebinarPage from 'layouts/webinar';

import Layout from 'components/layout';

export default function Webinar(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} hasPageData={!!props.webinar}>
      <WebinarPage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const webinar = await getPostByType({
    type: 'webinars',
    slug: params.slug,
  });

  return {
    props: {
      webinar,
      metaTags: webinar?.yoast_head,
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
