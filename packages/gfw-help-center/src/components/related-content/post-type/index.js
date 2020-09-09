/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { CancelToken } from 'axios';
import sortBy from 'lodash/sortBy';

import { Loader } from 'gfw-components';

import { fetchPostTypeData } from '../../../helpers/request';

import Articles from '../articles';
import Webinars from '../webinars';
import Posts from '../posts';
import Organizations from '../organizations';

import { PostsWrapper } from './styles';

const ContentComponents = {
  articles: Articles,
  webinars: Webinars,
  posts: Posts,
  organizations: Organizations,
};

const PostType = ({ state, postType, include, maxCols }) => {
  const Component = ContentComponents[postType];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const source = CancelToken.source();

      try {
        const data = await fetchPostTypeData({
          baseUrl: state.source.api,
          type: postType,
          params: {
            include: include?.join(',') || '',
          },
          cancelToken: source.token,
        });

        const sortedData = sortBy(
          data.map((d) => ({ ...d, order: include.indexOf(d.id) })),
          'order'
        );
        setPosts(sortedData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  return (
    <PostsWrapper waiting={loading}>
      {loading && <Loader />}
      {!loading && <Component posts={posts} maxCols={maxCols} />}
    </PostsWrapper>
  );
};

PostType.propTypes = {
  state: PropTypes.object,
  postType: PropTypes.string,
  include: PropTypes.array,
  maxCols: PropTypes.number,
};

export default connect(PostType);
