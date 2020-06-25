import { styled } from 'frontity';
import { Column, Button } from 'gfw-components';
import { rgba } from 'emotion-rgba';

import SearchComponent from '../../components/search';
import theme from '../../app/theme';

export const PostContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  min-height: 500px;

  ${theme.mediaQueries.small} {
    padding-top: 40px;
  }
`;

export const Search = styled(SearchComponent)`
  margin-top: -20px;
  ${theme.mediaQueries.small} {
    margin-top: -30px;
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
      top: 0;
    }
  `}
`;

export const BreadCrumbsWrapper = styled(Column)`
  margin-bottom: 25px !important;

  ${theme.mediaQueries.small} {
    margin-bottom: 70px !important;
  }
`;

export const MetaItem = styled.div`
  color: ${theme.colors.mediumGrey};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 20px;
`;

export const PrintIcon = styled.img`
  width: 15px;
  height: 15px;
`;

export const StyledButton = styled(Button)`
  border-color: ${rgba(theme.colors.grey, 0.2)};
  margin-bottom: 20px;
`;

export const PostTitle = styled.h1`
  font-size: 30px;
  line-height: 38px;
  color: ${theme.colors.darkestGrey};
  font-weight: 300;
  margin-bottom: 15px;

  ${theme.mediaQueries.small} {
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 20px;
  }
`;

export const PostContentWrapper = styled.div`
  margin-bottom: 65px;
`;

export const TagsWrapper = styled.div`
  margin: 90px 0;
`;

export const Divider = styled.div`
  border-top: 1px solid ${theme.colors.lightGrey};
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  ${theme.mediaQueries.small} {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;
