import React from 'react';
import PropTypes from 'prop-types';

import treeErrorIcon from '../../assets/icons/error.svg';
import treeIcon from '../../assets/images/tree-success.png';

import { Container, Image, Title, Description } from './styles';

const Message = ({ error, title, description, small }) => (
  <Container>
    {error ? (
      <Image src={treeErrorIcon} alt="error tree" />
    ) : (
      <Image src={treeIcon} alt="success tree" />
    )}
    <Title small={small}>{title}</Title>
    <Description small={small}>{description}</Description>
  </Container>
);

Message.propTypes = {
  error: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  small: PropTypes.string
};

export default Message;
