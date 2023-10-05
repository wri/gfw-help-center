import groupBy from 'lodash/groupBy';

import { getPostsByType } from 'lib/api';
import { convertTool } from 'utils/tools';
import { statusFilter } from 'utils/articles-filter';

import dynamic from 'next/dynamic';

import ToolsPage from 'layouts/tools';

import { getPublishedNotifications } from 'utils/notifications';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Tools(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} page={props?.currentTool}>
      <ToolsPage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params, preview, previewData }) {
  const slug = params?.slugs?.[params?.slugs?.length - 1];
  const isPreview = !!preview && previewData?.slug === slug;

  const notifications = await getPublishedNotifications();

  const tools = await getPostsByType({
    type: 'tools',
    params: {
      per_page: 100,
      order: 'asc',
      orderby: 'menu_order',
      // XXX: We will perform a check in layouts as private posts are only available for PRO
      status: statusFilter(),
      ...(isPreview && {
        status: 'any',
      }),
    },
  });

  const toolsMapped = tools?.map((tool) => ({
    ...convertTool(tool),
  }));

  const toolsGrouped = toolsMapped && groupBy(toolsMapped, 'parent');
  const parentTools = toolsGrouped?.['0'];

  const currentParent = parentTools?.find((t) => t.slug === params.slugs[0]);
  const currentParentId = currentParent?.id;

  const currentTool = toolsMapped?.find(
    (t) =>
      (!t.parent || currentParentId === t.parent) &&
      t.slug === params.slugs[params.slugs.length - 1]
  );

  const proLoginRequired = currentTool?.status === 'private';

  const siblingTools = currentTool?.parent
    ? toolsGrouped?.[currentTool?.parent]
    : toolsGrouped?.[currentTool?.id];

  return {
    props: {
      tools: tools || [],
      proLoginRequired,
      parentTools: parentTools || [],
      currentPage: currentTool || null,
      siblingTools: siblingTools || [],
      metaTags: currentTool?.yoast_head || null,
      preview: isPreview,
      isError:
        !currentTool || currentTool?.link !== `/${params?.slugs?.join('/')}`,
      notifications: notifications || [],
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
    return `/${parent ? `${parent?.slug}/` : ''}${tool.slug}`;
  });

  return {
    paths: paths || [],
    fallback: true,
  };
}
