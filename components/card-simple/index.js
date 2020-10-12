import React from 'react';
import PropTypes from 'prop-types';
import { Desktop } from 'gfw-components';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import { css } from '@emotion/core';

import { LangConsumer } from 'utils/lang';

import Media from 'components/media';
import CategoriesList from 'components/category-list';

import { Card, Title, Text, BackgroundImage, Icon, ArrowIcon } from './styles';

const SimpleCard = ({
  icon,
  backgroundImage,
  large,
  arrow,
  tools,
  translations_posts,
  ...rawCardData
}) => (
  <LangConsumer>
    {(lang) => {
      const translatedData = translations_posts?.find((c) => c.locale === lang);
      const cardData = translatedData || rawCardData;
      const { title, excerpt, extLink, link } = cardData || {};

      return (
        <Card large={large}>
          {extLink && (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
              href={extLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="external link"
            />
          )}
          {!extLink && link && (
            <Link href={link}>
              <a> </a>
            </Link>
          )}
          {backgroundImage && (
            <BackgroundImage>
              <Media {...backgroundImage} />
            </BackgroundImage>
          )}
          <div>
            {icon && <Icon src={icon.url} alt={icon.title} />}
            {tools && (
              <CategoriesList
                css={css`
                  z-index: 3;
                  position: relative;
                `}
                categories={tools}
              />
            )}
            {title && <Title light={!!backgroundImage}>{title}</Title>}
            {excerpt && (
              <Text light={!!backgroundImage}>{ReactHtmlParser(excerpt)}</Text>
            )}
          </div>
          {arrow && (
            <Desktop>
              <ArrowIcon />
            </Desktop>
          )}
        </Card>
      );
    }}
  </LangConsumer>
);

export default SimpleCard;

SimpleCard.propTypes = {
  icon: PropTypes.object,
  translations_posts: PropTypes.array,
  large: PropTypes.bool,
  arrow: PropTypes.bool,
  tools: PropTypes.array,
  backgroundImage: PropTypes.object,
};
