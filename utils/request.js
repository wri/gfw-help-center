import { get } from 'axios';
import { stringify } from 'query-string';
import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';
import decode from 'simple-entity-decode';

// eslint-disable-next-line import/prefer-default-export
export const fetchPostTypeData = async ({ type, params, cancelToken }) => {
  const { data: posts } = await get(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type}${
      params ? `?${stringify(params)}` : ''
    }`,
    { cancelToken }
  );
  let media = null;
  let categories = null;
  let toolCats = null;

  const featuredMedia = compact(posts.map((post) => post.featured_media));

  if (featuredMedia && featuredMedia.length) {
    const mediaResponse = await get(
      `${
        process.env.NEXT_PUBLIC_WORDPRESS_URL
      }/wp/v2/media?include=${featuredMedia.join(',')}`,
      { cancelToken }
    );
    media = mediaResponse.data;
  }

  const catIds =
    posts && compact(uniq(flatMap(posts.map((post) => post?.categories))));
  if (catIds && catIds.length) {
    const categoriesResponse = await get(
      `${
        process.env.NEXT_PUBLIC_WORDPRESS_URL
      }/wp/v2/categories?include=${catIds.join(',')}`,
      { cancelToken }
    );
    categories = categoriesResponse?.data?.map((cat) => {
      const url = new URL(cat.link);

      return {
        ...cat,
        link: url.pathname,
      };
    });
  }

  const toolCatIds =
    posts && compact(uniq(flatMap(posts.map((post) => post?.tool_cats))));
  if (toolCatIds && toolCatIds.length) {
    const toolCatsResponse = await get(
      `${
        process.env.NEXT_PUBLIC_WORDPRESS_URL
      }/wp/v2/tool_cats?include=${toolCatIds.join(',')}`,
      { cancelToken }
    );
    toolCats = toolCatsResponse?.data?.map((cat) => {
      const url = new URL(cat.link);

      return {
        ...cat,
        link: url.pathname,
      };
    });
  }

  return posts.map((post) => {
    const url = new URL(post.link);

    return {
      ...post,
      title: decode(post.title.rendered),
      ...(media && {
        featured_media: media.find((m) => m.id === post.featured_media),
      }),
      ...(categories && {
        categories: categories.filter((cat) =>
          post.categories.includes(cat.id)
        ),
      }),
      ...(toolCats && {
        tool_cats: toolCats.filter((cat) => post.tool_cats.includes(cat.id)),
      }),
      link: url.pathname,
    };
  });
};
