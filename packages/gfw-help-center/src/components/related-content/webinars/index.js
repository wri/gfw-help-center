/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';

import Card from '../../card';

const Webinars = ({ libraries, posts: webinars, maxCols }) => {
  const Html2React = libraries?.html2react?.Component;

  return (
    <Row nested>
      {webinars?.map(
        ({ id, content, featured_media: media, ...rest }) => (
          <Column key={id} width={[1, 1/2, 1/(maxCols || 2)]} css={css`margin-bottom: 30px;`}>
            <Card
              {...rest}
              excerpt={<Html2React html={content.rendered} />}
              {...media && {
                media
              }}
              video
            />
          </Column>
        )
      )}
    </Row>
  );
}

Webinars.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object,
  maxCols: PropTypes.number
};

export default connect(Webinars);
