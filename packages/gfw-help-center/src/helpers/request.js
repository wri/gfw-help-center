import { decode } from 'frontity';
import { get } from 'axios';
import { stringify } from 'query-string';
import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';

// eslint-disable-next-line import/prefer-default-export
export const fetchPostTypeData = async ({ baseUrl, type, params, cancelToken }) => {
  const { data: posts } = await get(`${baseUrl}/wp/v2/${type}${params ? `?${stringify(params)}` : ''}`, { cancelToken });
  let media = null;
  let categories = null;

  const featuredMedia = compact(posts.map((post) => post.featured_media));

  if (featuredMedia && featuredMedia.length) {
    const mediaResponse = await get(`${baseUrl}/wp/v2/media?include=${featuredMedia.join(',')}`, { cancelToken })
    media = mediaResponse.data;
  }

  const catIds = posts && compact(uniq(flatMap(posts.map((post) => post?.categories))));
  if (catIds && catIds.length) {
    const categoriesResponse = await get(`${baseUrl}/wp/v2/categories?include=${catIds.join(',')}`, { cancelToken })
    categories = categoriesResponse?.data?.map(cat => {
      const url = new URL(cat.link);

      return {
        ...cat,
        link: url.pathname
      }
    });
  }

  return posts.map(post => {
    const url = new URL(post.link);

    return {
      ...post,
      title: decode(post.title.rendered),
      ...media && {
        featured_media: media.find(m => m.id === post.featured_media)
      },
      ...categories && {
        categories: categories.filter(cat => post.categories.includes(cat.id))
      },
      link: url.pathname
    }
  })
}