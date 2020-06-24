/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import Card from '../../card';

const Webinars = ({ libraries, posts: webinars }) => {
  const Html2React = libraries?.html2react?.Component;

  return webinars?.map(
    ({ id, content, featured_media: media, ...rest }) => (
      <Card
        key={id}
        {...rest}
        text={<Html2React html={content.rendered} />}
        {...media && {
          media
        }}
      />
    )
  )
}

Webinars.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object
};

export default connect(Webinars);
