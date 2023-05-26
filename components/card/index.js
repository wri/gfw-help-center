import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import { Button } from '@worldresources/gfw-components';

import { LangConsumer } from 'utils/lang';

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

const CardLink = ({ extLink, link, children }) => {
  if (extLink) {
    return (
      <a
        href={extLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="external link"
      >
        {children}
      </a>
    );
  }

  if (!extLink && link) {
    return (
      <Link href={link}>
        <a>{children}</a>
      </Link>
    );
  }

  return children;
};

const Card = ({
  featured_media,
  translations_posts,
  categories,
  large,
  video,
  ...rawCardData
}) => (
  <LangConsumer>
    {(lang) => {
      const translatedData = translations_posts?.find((c) => c.locale === lang);
      const cardData = translatedData || rawCardData;
      const { title, excerpt, link, extLink } = cardData || {};
      return (
        <CardWrapper>
          <CardLink extLink={extLink} link={link}>
            {!!featured_media && (
              <MediaWrapper large={large}>
                <Media {...featured_media} />
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
            {title && (
              <PostTitle className="notranslate" large={large}>
                {title}
              </PostTitle>
            )}
            {excerpt && (
              <PostExcerpt className="notranslate" large={large}>
                {ReactHtmlParser(excerpt)}
              </PostExcerpt>
            )}
          </CardLink>
        </CardWrapper>
      );
    }}
  </LangConsumer>
);

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  media: PropTypes.object,
  categories: PropTypes.array,
  large: PropTypes.bool,
  video: PropTypes.bool,
  featured_media: PropTypes.object,
  translations_posts: PropTypes.array,
};

export default Card;
