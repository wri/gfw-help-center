import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Row, Column } from '@worldresources/gfw-components';

import Message from 'components/message';

// Class component is required here: componentDidCatch/getDerivedStateFromError
// have no hooks equivalent yet, so this can't be a functional component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface the failure loudly instead of letting the page render blank.
    // eslint-disable-next-line no-console
    console.error(
      'ErrorBoundary caught a render error:',
      error,
      info?.componentStack
    );
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Container>
          <Column>
            <Message
              error
              title="We're sorry, something went wrong."
              description="Try refreshing the page. If the problem continues, please let us know."
            />
          </Column>
        </Container>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

const Container = styled(Row)`
  padding: 70px 0 100px !important;
`;
