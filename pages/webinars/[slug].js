import { getPostsByType, getPostByType } from 'lib/api';

import dynamic from 'next/dynamic';

import WebinarPage from 'layouts/webinar';

import { articlesFilter } from 'utils/articles-filter';
import { getPublishedNotifications } from 'utils/notifications';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

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
  const notifications = await getPublishedNotifications();

  return {
    props: {
      webinar: webinar || null,
      metaTags: webinar?.yoast_head || '',
      isError: !webinar,
      preview: isPreview,
      notifications: notifications || [],
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
