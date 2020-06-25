import { styled } from 'frontity';

import Search from '../../components/search';
import theme from '../../app/theme';

export const Wrapper = styled.div`
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;

export const ContentWrapper = styled.div`
  margin-bottom: 40px;
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
