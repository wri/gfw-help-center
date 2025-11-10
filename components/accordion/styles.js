import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const AccordionWrapper = styled.div`
  color: ${theme.colors.grey};
  width: 100%;
`;

export const CaretWrapper = styled.span`
  margin-right: 0.313rem;
  vertical-align: middle;
`;

export const AccordionItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;

  a,
  span {
    color: #555555;
    font-size: 1rem;
    font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  }

  a {
    width: 100%;
  }
`;

export const AccordionSubItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1.625rem;

  a,
  span {
    color: #555555;
    font-size: 1rem;
    font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  }

  a {
    width: 100%;
  }
`;

export const DividerTitle = styled.p`
  padding-left: 1.625rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  font-weight: bold;
`;

export const GreenDotWrapper = styled.span`
  align-self: center;
`;

export const GreenDot = styled.div`
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background: #97be33;
`;
