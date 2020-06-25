import React from 'react';
import PropTypes from 'prop-types';
import { css, connect, styled } from 'frontity';
import { Row, Column, H4 } from 'gfw-components';
import SimpleCard from '../card-simple';
import theme from '../../app/theme';

import supportCards from './config';

const Footer = ({ actions }) => {
  return (
    <Row>
      <Column>
        <Title>
          Get support
        </Title>
      </Column>
      {supportCards.map((card) => {
        return (
          <Column width={[1, 1 / 2]} key={card.title} css={css`margin-bottom: 30px;`}>
            {card.link && (
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                <SimpleCard {...card} />
              </a>
            )}
            {!card.link && (
              <button css={css`text-align: left; padding: 0;`} onClick={actions.theme.toggleContactUsModal}>
                <SimpleCard {...card} />
              </button>
            )}
          </Column>
        );
      })}
    </Row>
  );
};

const Title = styled(H4)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 30px;
  }
`;

Footer.propTypes = {
  actions: PropTypes.object
};

export default connect(Footer);
