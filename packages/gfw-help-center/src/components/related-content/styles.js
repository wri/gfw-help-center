import { styled } from 'frontity';
import { H4 } from 'gfw-components';

import theme from '../../app/theme';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.lightGrey};
  margin-bottom: 65px;
`;

export const Title = styled(H4)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 30px;
  }
`;