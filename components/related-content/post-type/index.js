/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Loader } from '@worldresources/gfw-components';

import { fetchPostsByIds } from 'utils/related-content';

import Articles from '../articles';
import Webinars from '../webinars';
import Posts from '../posts';
import Organizations from '../organizations';

import { PostsWrapper } from './styles';

const ContentComponents = {
  articles: Articles,
  additional_materials: Articles,
  webinars: Webinars,
  posts: Posts,
  organizations: Organizations,
};

const PostType = ({ postType, include, maxCols, resolvedPosts }) => {
  const Component = ContentComponents[postType];
  const hasPrefetchedPosts = resolvedPosts !== undefined;

  const [posts, setPosts] = useState(resolvedPosts || []);
  const [loading, setLoading] = useState(!hasPrefetchedPosts);

  useEffect(() => {
    if (!hasPrefetchedPosts) {
      const getArticles = async () => {
        try {
          const data = await fetchPostsByIds(postType, include);
          setPosts(data);
        } catch (err) {
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };

      getArticles();
    }
  }, [hasPrefetchedPosts, include, postType]);

  return (
    <PostsWrapper waiting={loading}>
      {loading && <Loader />}
      {!loading && <Component posts={posts} maxCols={maxCols} />}
    </PostsWrapper>
  );
};

PostType.propTypes = {
  postType: PropTypes.string,
  include: PropTypes.array,
  maxCols: PropTypes.number,
  resolvedPosts: PropTypes.array,
};

export default PostType;
