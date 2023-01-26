import { getPostsByType, getPostByType } from 'lib/api';

import WebinarPage from 'layouts/webinar';

import Layout from 'layouts/layout';

import { articlesFilter } from 'utils/articles-filter';

export default function Webinar(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} page={props?.webinar}>
      <WebinarPage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params, preview, previewData }) {
  const isPreview = !!preview;
  const webinar = await getPostByType({
    type: 'webinars',
    slug: params.slug,
    ...articlesFilter(isPreview, previewData),
  });

  return {
    props: {
      webinar: webinar || null,
      metaTags: webinar?.yoast_head || '',
      isError: !webinar,
      preview: isPreview,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allWebinars = await getPostsByType({
    type: 'webinars',
    params: { per_page: 100 },
  });

  const webinarsWithoutTax = allWebinars.filter((a) => !a?.help_tools?.length);
  const paths = webinarsWithoutTax?.map(
    (webinar) => `/webinars/${webinar.slug}/`
  );

  return {
    paths: paths || [],
    fallback: true,
  };
}
