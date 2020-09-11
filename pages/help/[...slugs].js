import Head from 'next/head';
import groupBy from 'lodash/groupBy';

import { getPostsByType } from 'lib/api';
import { convertTool } from 'utils/tools';

import ToolsPage from 'layouts/tools';

import Layout from 'components/layout';

export default function Tools(props) {
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
      <ToolsPage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const tools = await getPostsByType({
    type: 'tools',
    params: {
      per_page: 100,
      order: 'asc',
      orderby: 'menu_order',
    },
  });

  const toolsMapped = tools?.map((tool) => ({
    ...convertTool(tool),
  }));

  const toolsGrouped = groupBy(toolsMapped, 'parent');
  const parentTools = toolsGrouped?.['0'];

  const currentParent = parentTools.find((t) => t.slug === params.slugs[0]);
  const currentParentId = currentParent.id;

  const currentTool = toolsMapped.find(
    (t) =>
      (!t.parent || currentParentId === t.parent) &&
      t.slug === params.slugs[params.slugs.length - 1]
  );
  const siblingTools = currentTool?.parent
    ? toolsGrouped?.[currentTool?.parent]
    : toolsGrouped?.[currentTool?.id];

  return {
    props: {
      tools,
      parentTools,
      currentPage: currentTool,
      siblingTools: siblingTools || [],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allTools = await getPostsByType({
    type: 'tools',
    params: { per_page: 100 },
  });

  const paths = allTools?.map((tool) => {
    const parent = allTools.find((t) => t.id === tool.parent);
    return `/help/${parent ? `${parent?.slug}/` : ''}${tool.slug}`;
  });

  return {
    paths: paths || [],
    fallback: true,
  };
}
