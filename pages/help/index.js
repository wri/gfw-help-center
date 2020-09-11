import Head from 'next/head';

import { getPostsByType } from 'lib/api';
import { convertTool } from 'utils/tools';

import HomePage from 'layouts/home';

import Layout from 'components/layout';

export default function Index(props) {
  return (
    <Layout {...props}>
      <Head>
        <title>
          How to Use Global Forest Watch Maps & Tools | GFW Help Center
        </title>
        <meta
          name="description"
          content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
        />
      </Head>
      <HomePage {...props} />
    </Layout>
  );
}

export async function getStaticProps() {
  const tools = await getPostsByType({
    type: 'tools',
    params: {
      per_page: 100,
      order: 'asc',
      orderby: 'menu_order',
      parent: 0,
    },
  });

  const toolsMapped = tools?.map((tool) => ({
    ...convertTool(tool),
  }));

  return {
    props: {
      tools: toolsMapped,
    },
    revalidate: 10,
  };
}
