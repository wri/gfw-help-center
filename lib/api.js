import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import decode from 'simple-entity-decode';
import btoa from 'btoa';

import { cleanTitle } from 'utils/content';

const serializePosts = (posts) =>
  posts?.map((p) => {
    const url = p?.link && new URL(p.link);

    return {
      ...p,
      ...(p?.title && {
        title: cleanTitle(decode(p.title?.rendered)),
      }),
      ...(p?.excerpt && {
        excerpt: decode(p.excerpt?.rendered),
      }),
      ...(p?.content && {
        content: decode(p.content?.rendered),
      }),
      ...(p.featured_media && {
        featured_media_id: p.featured_media,
        featured_media: p._embedded?.['wp:featuredmedia']?.[0],
      }),
      ...(p.help_tags && {
        tag_ids: p.help_tags,
        tags:
          p._embedded?.['wp:term']?.[0]?.map((tag) => ({
            ...tag,
            link: `/tag/${tag.slug}`,
          })) || null,
      }),
      ...(p.help_tools && {
        tool_ids: p.help_tools,
        tools:
          p._embedded?.['wp:term']?.[1]?.map((tool) => ({
            ...tool,
            link: `/${tool.slug}`,
          })) || null,
      }),
      ...(p.categories && {
        category_ids: p.categories,
        categories: p._embedded?.['wp:term']?.[0],
      }),
      ...(p?.acf?.alt_link && {
        extLink: p.acf.alt_link,
      }),
      ...(p?.acf?.post_link && {
        extLink: p.acf.post_link,
      }),
      ...(p?.type === 'post' && {
        extLink: p?.link,
      }),
      link: url?.pathname?.replace('/help', ''),
      ...(p?.translations_posts && {
        translations_posts: p.translations_posts?.map((t) => {
          const tUrl = t?.link && new URL(t?.link);

          return {
            ...t,
            link: tUrl?.pathname?.replace('/help', ''),
            ...(t?.acf?.alt_link && {
              extLink: t.acf.alt_link,
            }),
            ...(t?.acf?.post_link && {
              extLink: t.acf.post_link,
            }),
            ...(p?.type === 'post' && {
              extLink: t?.link,
            }),
          };
        }),
      }),
    };
  });

const serializeTaxonomy = (taxonomy) =>
  taxonomy?.map((tax) => ({
    ...tax,
    link: `/tag/${tax.slug}`,
  }));

const REQUEST_TIMEOUT = 15000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const RETRYABLE_CODES = [
  'ETIMEDOUT',
  'ECONNABORTED',
  'ECONNRESET',
  'EHOSTUNREACH',
  'ENOTFOUND',
  'ECONNREFUSED',
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The WP backend (Pantheon dev sandbox) occasionally times out at the
// network level during builds; retry transient errors before giving up.
const requestWithRetry = async (config, attempt = 0) => {
  try {
    return await axios({ timeout: REQUEST_TIMEOUT, ...config });
  } catch (error) {
    const isRetryable =
      !error?.response && RETRYABLE_CODES.includes(error?.code);

    if (attempt < MAX_RETRIES && isRetryable) {
      await wait(RETRY_DELAY * (attempt + 1));
      return requestWithRetry(config, attempt + 1);
    }

    throw error;
  }
};

apiFetch.setFetchHandler(async (options) => {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.NEXT_PUBLIC_AUTH_USER && process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    const userPassword = btoa(
      `${process.env.NEXT_PUBLIC_AUTH_USER}:${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
    );
    headers.Authorization = `Basic ${userPassword}`;
  }

  const { url, path, data, method, params } = options;
  return requestWithRetry({
    headers,
    url: url || path,
    method,
    data,
    params,
  });
});

export async function getPostsByType({
  type,
  params,
  cancelToken,
  allLanguages,
} = {}) {
  let postsResponse;

  try {
    postsResponse = await apiFetch({
      url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
      params: {
        ...params,
        _embed: true,
        ...(!allLanguages && {
          lang: 'en',
        }),
      },
      cancelToken,
    });
  } catch (error) {
    console.error(`[lib/api] getPostsByType(${type}) failed:`, error?.message);
    return [];
  }

  return serializePosts(postsResponse?.data) || [];
}

export async function getPostByType({
  type,
  slug,
  id,
  params,
  cancelToken,
} = {}) {
  const postResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}${
      id ? `/${id}` : ''
    }`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
    cancelToken,
  });

  const post = Array.isArray(postResponse?.data)
    ? postResponse?.data
    : [postResponse?.data];

  return serializePosts(post)[0];
}

export async function getTags({ params } = {}) {
  let tagsResponse;

  try {
    tagsResponse = await apiFetch({
      url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
      params: {
        ...params,
        _embed: true,
      },
    });
  } catch (error) {
    console.error('[lib/api] getTags failed:', error?.message);
    return [];
  }

  return serializeTaxonomy(tagsResponse?.data) || [];
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
