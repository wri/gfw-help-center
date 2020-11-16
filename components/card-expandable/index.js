import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Content from 'components/content';
import { LangConsumer } from 'utils/lang';

import {
  Card,
  Title,
  Text,
  MinusIcon,
  PlusIcon,
  Thumbnail,
  ContentWrapper,
} from './styles';

const ExpandableCard = ({
  onAfterOpen,
  translations_posts,
  thumbnail,
  small,
  summary,
  ...rawCardData
}) => {
  const [open, setOpen] = useState(false);

  return (
    <LangConsumer>
      {(lang) => {
        const translatedData = translations_posts?.find(
          (c) => c.locale === lang
        );
        const cardData = translatedData || rawCardData;
        const { title, content } = cardData || {};
        const excerpt = `${content?.split('</p>')[0]}</p>`;

        return (
          <Card
            onClick={() => {
              setOpen(!open);
              if (!open && onAfterOpen) {
                onAfterOpen(cardData);
              }
            }}
            className="notranslate"
          >
            {thumbnail && <Thumbnail src={thumbnail} alt={title} />}
            <ContentWrapper className="notranslate">
              <Title>{title}</Title>
              {open && content && (
                <Text small={small}>
                  <Content>{content}</Content>
                </Text>
              )}
              {summary && !open && excerpt && (
                <Text small={small}>
                  <Content>{excerpt}</Content>
                </Text>
              )}
            </ContentWrapper>
            {open ? <MinusIcon /> : <PlusIcon />}
          </Card>
        );
      }}
    </LangConsumer>
  );
};

ExpandableCard.propTypes = {
  translations_posts: PropTypes.array,
  thumbnail: PropTypes.string,
  text: PropTypes.node,
  small: PropTypes.bool,
  summary: PropTypes.bool,
  onAfterOpen: PropTypes.func,
};

export default ExpandableCard;
