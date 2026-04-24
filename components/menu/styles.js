import styled from '@emotion/styled';
import { H4, H5, theme } from '@worldresources/gfw-components';

export const MenuWrapper = styled.ul`
  background-color: #f6f6f4;
  width: 100%;
  padding: 30px 0;

  ${theme.mediaQueries.small} {
    background-color: ${theme.colors.white};
    padding: 0;
  }
`;

export const MenuItem = styled.li`
  a,
  button {
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.grey};
    padding: 10px ${theme.grid.mobileGutter};
    display: block;
    text-align: left;

    ${theme.mediaQueries.small} {
      padding: 0 0 20px;
    }
  }

  ${({ active }) =>
    active &&
    `
    a,
    button {
      color: ${theme.colors.green};
    }
  `}
`;

export const Title = styled(H4)`
  margin-left: ${theme.grid.mobileGutter};
  margin-bottom: 20px;
`;

export const ProTitle = styled(H5)`
  color: ${theme.colors.grey};
  font-size: 13px;
  border-top: 1px solid ${theme.colors.grey};
  margin-bottom: 20px;
  margin-top: 10px;
  padding-top: 25px;
`;
