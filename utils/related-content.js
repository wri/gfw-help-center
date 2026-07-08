import sortBy from 'lodash/sortBy';

import { getPostByType, getPostsByType } from 'lib/api';
import { statusFilter } from 'utils/articles-filter';

const POST_TYPE_LAYOUTS = new Set([
  'articles',
  'additional_materials',
  'webinars',
  'posts',
  'organizations',
]);

const sortPostsByIncludeOrder = (posts, include) =>
  sortBy(
    posts.map((post) => ({ ...post, order: include.indexOf(post.id) })),
    'order'
  );

export const fetchPostsByIds = async (type, include = []) => {
  if (!include?.length) {
    return [];
  }

  const params = {
    include: include.join(','),
    per_page: 100,
    status: statusFilter(),
  };

  try {
    const posts = await getPostsByType({ type, params });
    return sortPostsByIncludeOrder(posts, include);
  } catch (batchError) {
    const posts = await Promise.all(
      include.map(async (id) => {
        try {
          return await getPostByType({
            type,
            id,
            params: { status: statusFilter() },
          });
        } catch (postError) {
          return null;
        }
      })
    );

    return sortPostsByIncludeOrder(posts.filter(Boolean), include);
  }
};

export const resolveRelatedContentSections = async (sections = []) => {
  if (!sections?.length) {
    return sections;
  }

  return Promise.all(
    sections.map(async (section) => {
      const { acf_fc_layout: sectionType } = section;

      if (!POST_TYPE_LAYOUTS.has(sectionType)) {
        return section;
      }

      const include = section[`${sectionType}_by_id`] || section[sectionType];

      if (!include?.length) {
        return section;
      }

      const resolvedPosts = await fetchPostsByIds(sectionType, include);

      return {
        ...section,
        resolvedPosts,
      };
    })
  );
};
