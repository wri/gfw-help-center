import styled from '@emotion/styled';
import { Row, theme } from '@worldresources/gfw-components';

import Search from '../../components/search';

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 3.125rem;
`;

export const SearchMobile = styled(Search)`
  display: block;
  margin-top: -20px;
  ${theme.mediaQueries.small} {
    display: none;
  }
  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;
    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const SearchDesktop = styled(Search)`
  ${({ isSearch }) =>
    !isSearch &&
    `
    display: none;
    ${theme.mediaQueries.small} {
      display: block;
    }
  `}
  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;
    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const CategoryDescription = styled.p`
  margin-top: 15px;
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkGrey};
`;

export const ResultsStatement = styled.p`
  color: ${theme.colors.mediumGrey};
  padding-bottom: 2rem;
`;

export const LoadMoreWrapper = styled(Row)`
  margin: 20px 0 50px !important;
  ${theme.mediaQueries.small} {
    margin-top: 60px !important;
  }
`;

export const MenuWrapper = styled.div`
  margin-top: 40px;
`;

export const ResultTitle = styled.h1`
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: xxx-large;
  font-weight: lighter;
`;
