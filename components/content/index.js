import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import { Carousel } from '@worldresources/gfw-components';

import Blockquote from 'components/blockquote';
import CodeBlock from 'components/code-block';
import Lightbox from 'components/lightbox';

import ContentWrapper from './styles';

const PostContent = ({ children, align, print }) => (
  <ContentWrapper align={align}>
    {ReactHtmlParser(children, {
      transform: (node) => {
        if (node.name === 'code') {
          return <CodeBlock>{node.children}</CodeBlock>;
        }

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

        if (node.name === 'img') {
          const { src, alt, key } = node?.attribs;
          if (print) return <img src={src} alt={alt} key={key} />;
          return <Lightbox src={src} alt={alt} key={key} />;
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
