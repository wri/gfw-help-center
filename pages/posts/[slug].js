import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from 'components/container';
import Layout from 'components/layout';
import { getPostsByType, getPostByType } from 'lib/api';
import PostTitle from 'components/post-title';
import Head from 'next/head';

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title?.rendered}</title>
              </Head>
              {post.title.rendered}
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

Post.propTypes = {
  post: PropTypes.array,
  preview: PropTypes.bool,
};

export async function getStaticProps({ params, preview = null }) {
  const post = await getPostByType({ slug: params.slug });

  return {
    props: {
      preview,
      post,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allPosts = await getPostsByType();

  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
}
