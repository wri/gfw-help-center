import { styled } from 'frontity';
import theme from '../../app/theme';

// eslint-disable-next-line import/prefer-default-export
export const MenuItem = styled.li`
  margin-bottom: 35px;

  a,
  button {
    font-size: 16px;
    color: ${theme.colors.grey};
  }

  ${({ active }) => active && `
    a,
    button {
      color: ${theme.colors.green};
    }
  `}
`