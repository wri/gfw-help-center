import React from 'react';
import PropTypes from 'prop-types';
import { styled, connect } from 'frontity';
import { Row, Column } from 'gfw-components';

import Message from '../../components/message';

const Page404 = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "We're sorry, something went wrong.";
  const title404 = 'Page not found';

  const description = 'Try refreshing the page or check your connection.';
  const description404 =
    'You may have mistyped the address or the page may have moved.';

  return (
    <Container>
      <Column>
        <Message error title={data.is404 ? title404 : title} description={data.is404 ? description404 : description} />
      </Column>
    </Container>
  );
};

Page404.propTypes = {
  state: PropTypes.object,
};

export default connect(Page404);

const Container = styled(Row)`
  padding: 70px 0 100px !important;
`;
