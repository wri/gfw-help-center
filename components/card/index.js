import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
// import Link from 'next/link';

import { Button } from 'gfw-components';

import Media from '../media';
import CategoryList from '../category-list';

import PlayIconSrc from '../../assets/icons/play.svg';

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
    {/* <Link
      href={link}
    >
      <a
        css={css`
          z-index: 1;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        `}
      >

      </a>
    </Link> */}
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
              <PlayIcon src={PlayIconSrc} alt="video card" />
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
