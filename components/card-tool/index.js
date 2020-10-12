import React from 'react';
import PropTypes from 'prop-types';

import Media from 'components/media';

import { LangConsumer } from 'utils/lang';

import { Card, ContentWrapper, Title, Text, BannerImage, Logo } from './styles';

const ToolCard = ({ translations_posts, bannerImage, logo, active }) => (
  <LangConsumer>
    {(lang) => {
      const rawCardData = translations_posts?.find((c) => c.locale === 'en_US');
      const translatedData = translations_posts?.find((c) => c.locale === lang);
      const cardData = translatedData || rawCardData;
      const { title, excerpt } = cardData || {};

      return (
        <Card active={active}>
          <ContentWrapper>
            {title && <Title>{title}</Title>}
            {excerpt && <Text>{excerpt}</Text>}
          </ContentWrapper>
          {logo && (
            <Logo>
              <Media {...logo} />
            </Logo>
          )}
          {bannerImage && (
            <BannerImage>
              <Media {...bannerImage} />
            </BannerImage>
          )}
        </Card>
      );
    }}
  </LangConsumer>
);

ToolCard.propTypes = {
  translations_posts: PropTypes.array,
  state: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.node,
  bannerImage: PropTypes.object,
  logo: PropTypes.object,
  active: PropTypes.bool,
};

export default ToolCard;
