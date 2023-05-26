import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export default styled.div`
  width: 100%;
  font-size: 12px;
  line-height: 21px;
  color: ${theme.colors.mediumGrey};

  a {
    color: ${theme.colors.green};

    &:hover {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }
  }
`;
