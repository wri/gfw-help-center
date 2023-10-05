/* eslint-disable react/prop-types */
import { getPostByType, getPostsByType } from 'lib/api';
import { convertTool } from 'utils/tools';
import { getPublishedNotifications } from 'utils/notifications';

import dynamic from 'next/dynamic';

import HomePage from 'layouts/home';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Index(props) {
  return (
    <Layout {...props}>
      <HomePage {...props} />
    </Layout>
  );
}

export async function getStaticProps() {
  const homepage = await getPostByType({
    type: 'pages',
    slug: 'help-center',
  });

  const tools = await getPostsByType({
    type: 'tools',
    params: {
      per_page: 100,
      order: 'asc',
      orderby: 'menu_order',
      parent: 0,
    },
  });

  const notifications = await getPublishedNotifications();

  const toolsMapped = tools?.map((tool) => ({
    ...convertTool(tool),
  }));

  return {
    props: {
      homepage: homepage || {},
      tools: toolsMapped || [],
      metaTags: homepage?.yoast_head || '',
      notifications: notifications || [],
    },
    revalidate: 10,
  };
}
