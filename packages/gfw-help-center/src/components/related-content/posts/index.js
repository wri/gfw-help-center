/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';

import Card from '../../card';

const Posts = ({ libraries, posts: articles, maxCols }) => {
  const Html2React = libraries?.html2react?.Component;

  return (
    <Row nested>
      {articles?.map(
        ({ id, excerpt, featured_media: media, ...rest }) => (
          <Column width={[1, 1/2, 1/(maxCols || 2)]} css={css`margin-bottom: 30px;`}>
            <Card
              key={id}
              {...rest}
              excerpt={<Html2React html={excerpt.rendered} />}
              {...media && {
                media
              }}
            />
          </Column>
        )
    )}
    </Row>
  )
}

Posts.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object,
  maxCols: PropTypes.number,
};

export default connect(Posts);
