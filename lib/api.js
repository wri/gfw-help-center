import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import decode from 'simple-entity-decode';

const serializePosts = (posts) =>
  posts.map((p) => {
    const url = new URL(p.link);

    return {
      ...p,
      title: decode(p.title?.rendered),
      ...(p.featured_media && {
        featured_media_id: p.featured_media,
        featured_media: p._embedded?.['wp:featuredmedia']?.[0],
      }),
      ...(p.help_tags && {
        tag_ids: p.help_tags,
        tags: p._embedded?.['wp:term']?.[0]?.map((tag) => ({
          ...tag,
          link: `/help/tag/${tag.slug}`,
        })),
      }),
      link: url.pathname,
    };
  });

const serializeTaxonomy = (taxonomy) =>
  taxonomy.map((tax) => ({
    ...tax,
    link: `/help/tag/${tax.slug}`,
  }));

apiFetch.setFetchHandler((options) => {
  const { url, path, data, method, params } = options;

  return axios({
    url: url || path,
    method,
    data,
    params,
  });
});

export async function getPostsByType({ type, params, cancelToken } = {}) {
  const postsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
    params: {
      ...params,
      _embed: true,
    },
    cancelToken,
  });

  return serializePosts(postsResponse?.data);
}

export async function getPostByType({ type, slug, params, cancelToken } = {}) {
  const postResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
    cancelToken,
  });

  return serializePosts(postResponse?.data)[0];
}

export async function getTags({ params } = {}) {
  const tagsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
    params: {
      ...params,
      _embed: true,
    },
  });

  return serializeTaxonomy(tagsResponse?.data);
}

export async function getTagBySlug({ slug, params }) {
  const tagResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
  });

  return serializeTaxonomy(tagResponse?.data)[0];
}
