import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { Button } from 'gfw-components';

import Media from 'components/media';
import CategoryList from 'components/category-list';

import {
  CardWrapper,
  MediaWrapper,
  Overlay,
  PlayIcon,
  PostTitle,
  PostExcerpt,
} from './styles';

const Card = ({ title, excerpt, media, categories, large, video }) => (
  <CardWrapper>
    {!!media && (
      <MediaWrapper large={large}>
        <Media {...media} />
        {video && (
          <Overlay>
            <Button
              round
              light
              css={css`
                border: none;
              `}
            >
              <PlayIcon />
            </Button>
          </Overlay>
        )}
      </MediaWrapper>
    )}
    {categories && (
      <CategoryList
        categories={categories}
        css={css`
          z-index: 2;
          position: relative;
        `}
      />
    )}
    {title && <PostTitle large={large}>{title}</PostTitle>}
    {excerpt && <PostExcerpt large={large}>{excerpt}</PostExcerpt>}
  </CardWrapper>
);

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.node,
  media: PropTypes.object,
  categories: PropTypes.array,
  large: PropTypes.bool,
  video: PropTypes.bool,
};

export default Card;
