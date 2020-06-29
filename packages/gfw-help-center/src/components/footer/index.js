import React from 'react';
import PropTypes from 'prop-types';
import { css, connect, styled } from 'frontity';
import { Row, Column, H4 } from 'gfw-components';
import SimpleCard from '../card-simple';
import theme from '../../app/theme';

const Footer = ({ state, actions, libraries }) => {
  const { support, contactUs } = state.source.data['all-tools/'];
  const Html2React = libraries?.html2react?.Component;

  return (
    <Row>
      <Column>
        <Title>
          Get support
        </Title>
      </Column>
      <Column width={[1, 1 / 2]} css={css`margin-bottom: 30px;`}>
        <a href={support?.acf?.alt_link} target="_blank" rel="noopener noreferrer">
          <SimpleCard {...support} title={support?.title?.rendered} text={<Html2React html={support?.excerpt?.rendered} />} />
        </a>
      </Column>
      <Column width={[1, 1 / 2]} css={css`margin-bottom: 30px;`}>
        <button css={css`text-align: left; padding: 0; width: 100%;`} onClick={actions.theme.toggleContactUsModal}>
          <SimpleCard {...contactUs} title={contactUs?.title?.rendered} text={<Html2React html={contactUs?.excerpt?.rendered} />} />
        </button>
      </Column>
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
  actions: PropTypes.object,
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(Footer);
