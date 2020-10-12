/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import ExpandableCard from 'components/card-expandable';

import { CardWrapper } from './styles';

const Organizations = ({ posts: organizations }) => {
  return organizations?.map(
    ({
      id,
      content,
      thumbnail,
      acf,
      excerpt,
      featured_media: media,
      ...rest
    }) => (
      <CardWrapper key={id}>
        <ExpandableCard
          {...rest}
          text={content}
          excerpt={`${content?.split('</p>')[0]}</p>`}
          thumbnail={media?.media_details?.sizes?.medium?.source_url}
          arrow
          small
        />
      </CardWrapper>
    )
  );
};

Organizations.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object,
};

export default Organizations;
