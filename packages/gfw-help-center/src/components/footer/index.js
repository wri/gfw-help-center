import React from 'react';
import PropTypes from 'prop-types';
import { css, connect } from 'frontity';
import { Row, Column, H4 } from 'gfw-components';
import SimpleCard from '../card-simple';

import supportCards from './config';

const Footer = ({ actions }) => {
  return (
    <Row>
      <Column>
        <H4
          css={css`
            margin-bottom: 30px;
          `}
        >
          Get support
        </H4>
      </Column>
      {supportCards.map((card) => {
        return (
          <Column width={[1, 1 / 2]} key={card.title}>
            {card.link && (
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                <SimpleCard {...card} />
              </a>
            )}
            {!card.link && (
              <button css={css`text-align: left;`} onClick={actions.theme.toggleContactUsModal}>
                <SimpleCard {...card} />
              </button>
            )}
          </Column>
        );
      })}
    </Row>
  );
};

Footer.propTypes = {
  actions: PropTypes.object
};

export default connect(Footer);
