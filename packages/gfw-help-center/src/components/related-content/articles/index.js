/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import SimpleCard from '../../card-simple';

import { LinkWrapper } from './styles';

const Articles = ({ libraries, posts: articles }) => {
  const Html2React = libraries?.html2react?.Component;

  return articles?.map(
    ({ id, excerpt, link, ...rest }) => (
      <LinkWrapper link={link} key={id}>
        <SimpleCard
          {...rest}
          text={<Html2React html={excerpt?.rendered} />}
          arrow
        />
      </LinkWrapper>
    )
  )
}

Articles.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object
};

export default connect(Articles);
