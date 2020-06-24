/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import SimpleCard from '../../card-simple';

import { LinkWrapper } from './styles';

const Articles = ({ libraries, posts: articles }) => {
  const Html2React = libraries?.html2react?.Component;

  return articles?.map(
    ({ id, content, link, ...rest }) => (
      <LinkWrapper link={link} key={id}>
        <SimpleCard
          text={<Html2React html={content.rendered} />}
          {...rest}
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
