import React from 'react';

import { Row, Column } from '@worldresources/gfw-components';

import { Wrapper, Container, CloseIcon } from './styles';

const PreviewBanner = () => (
  <Wrapper>
    <Row>
      <Column>
        <Container>
          <a href="/help/api/exit-preview">
            PREVIEW MODE
            <CloseIcon />
          </a>
        </Container>
      </Column>
    </Row>
  </Wrapper>
);

export default PreviewBanner;
