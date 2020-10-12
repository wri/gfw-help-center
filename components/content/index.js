import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import { Carousel } from 'gfw-components';

import Blockquote from 'components/blockquote';

import ContentWrapper from './styles';

const PostContent = ({ children, align, print }) => (
  <ContentWrapper align={align}>
    {ReactHtmlParser(children, {
      transform: (node) => {
        if (
          node.name === 'ul' &&
          node?.attribs.class === 'blocks-gallery-grid'
        ) {
          return (
            <Carousel
              settings={{
                slidesToShow: 1,
                slidesToScroll: 1,
                lazyLoad: false,
                infinite: true,
                focusOnSelect: true,
              }}
            >
              {node.children.map(convertNodeToElement)}
            </Carousel>
          );
        }

        if (node.name === 'blockquote') {
          return (
            <Blockquote>{node.children.map(convertNodeToElement)}</Blockquote>
          );
        }

        if (print && node.name === 'img') {
          return (
            <img
              key={node.attribs.href}
              src={node.attribs.src}
              alt={node.attribs.alt}
            />
          );
        }

        return '';
      },
    })}
  </ContentWrapper>
);

PostContent.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  print: PropTypes.bool,
};

export default PostContent;
