import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';

import PostContent from 'components/content';

import { PostTitle } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends Component {
  render() {
    const { article } = this.props;
    const { title, content } = article || {};

    return (
      <>
        <Global
          styles={css`
            @media print {
              html,
              body {
                height: initial !important;
                overflow: initial !important;
                -webkit-print-color-adjust: exact;
              }
            }

            @page {
              size: auto;
              margin: 25mm 25mm 30mm;
            }
          `}
        />
        <div>
          <p
            css={css`
              margin-bottom: 5px;
            `}
          >
            Global Forest Watch Help Center
          </p>
          <p
            css={css`
              margin-bottom: 50px;
            `}
          >
            https://www.globalforestwatch.org/help
          </p>
          <PostTitle className="notranslate">
            {ReactHtmlParser(title)}
          </PostTitle>
          <PostContent align="left">
            {ReactHtmlParser(content.rendered)}
          </PostContent>
        </div>
      </>
    );
  }
}

ComponentToPrint.propTypes = {
  article: PropTypes.object,
};

export default ComponentToPrint;
