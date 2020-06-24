/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import ExpandableCard from '../../card-expandable';

import { CardWrapper } from './styles';

const Organizations = ({ libraries, posts: organizations }) => {
  const Html2React = libraries?.html2react?.Component;

  return organizations?.map(
    ({ id, content, thumbnail, featured_media: media, ...rest }) => (
      <CardWrapper key={id}>
        <ExpandableCard
          {...rest}
          text={<Html2React html={content.rendered} />}
          thumbnail={media?.media_details?.sizes?.medium?.source_url}
          arrow
          small
        />
      </CardWrapper>
    )
  )
}

Organizations.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object
};

export default connect(Organizations);
