/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import SimpleCard from 'components/card-simple';

import { LinkWrapper } from './styles';

const Articles = ({ posts: articles }) => {
  return articles?.map(({ id, tool_cats, ...rest }) => (
    <LinkWrapper key={id}>
      <SimpleCard {...rest} categories={tool_cats} arrow />
    </LinkWrapper>
  ));
};

Articles.propTypes = {
  posts: PropTypes.array,
  libraries: PropTypes.object,
};

export default Articles;
