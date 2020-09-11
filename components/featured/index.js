import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Link from 'next/link';

import { clearExcerptHellip } from 'utils/content';

import Media from '../media';
import CategoryList from '../category-list';

import {
  Wrapper,
  Overlay,
  ContentWrapper,
  PostTitle,
  PostExcerpt,
} from './styles';

const MainPost = ({ libraries, state, id, type }) => {
  const Html2React = libraries.html2react.Component;
  const { link, featured_media: featuredMediaId, categories, title, excerpt } =
    state?.source?.[type]?.[id] || {};
  const postCategories = categories.map((cat) => state.source.category[cat]);
  const media = state.source.attachment[featuredMediaId];

  return (
    <Wrapper>
      {media && <Media {...media} />}
      <Link
        href={link}
        css={css`
          z-index: 1;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        `}
      />
      <Overlay>
        <ContentWrapper>
          <CategoryList categories={postCategories} />
          <PostTitle>{title.rendered}</PostTitle>
          <PostExcerpt>
            <Html2React html={clearExcerptHellip(excerpt.rendered)} />
          </PostExcerpt>
        </ContentWrapper>
      </Overlay>
    </Wrapper>
  );
};

export default MainPost;

MainPost.propTypes = {
  state: PropTypes.object,
  id: PropTypes.number,
  libraries: PropTypes.object,
  type: PropTypes.string,
};
