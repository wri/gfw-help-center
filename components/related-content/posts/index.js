/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column } from '@worldresources/gfw-components';

import Card from 'components/card';

const Posts = ({ posts: articles, maxCols }) => {
  return (
    <Row nested>
      {articles?.map(({ id, link, ...rest }) => (
        <Column
          key={id}
          width={[1, 1 / 2, 1 / (maxCols || 2)]}
          css={css`
            margin-bottom: 30px;
          `}
        >
          <Card {...rest} />
        </Column>
      ))}
    </Row>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
  maxCols: PropTypes.number,
};

export default Posts;
