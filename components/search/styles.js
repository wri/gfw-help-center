import styled from '@emotion/styled';
import { BasicInput, theme } from '@worldresources/gfw-components';
import { rgba } from 'emotion-rgba';

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  cursor: pointer;
  z-index: 20;
  position: relative;

  ${({ open, expandable }) =>
    open &&
    expandable &&
    `
    position: absolute;
    left: 0;
    right: 0;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;
  `}

  ${theme.mediaQueries.small} {
    height: 80px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 3.75rem;
  background-color: #f6f6f4;
  max-height: 2.625rem;
  height: 2.625rem;
  -webkit-border-radius: 1.25rem;
  -moz-border-radius: 1.25rem;
  border-radius: 1.25rem;
  padding-left: 1rem;
  ${theme.mediaQueries.small} {
    height: 80px;
  }
  ${({ open, expanded }) =>
    (open || expanded) &&
    `
    border-bottom-color: ${theme.colors.grey};
  `}
`;

export const SearchClosed = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchOpen = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const OpenMessage = styled.span`
  color: ${theme.colors.mediumGrey};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 400;
  margin-right: 10px;
`;

export const Input = styled(BasicInput)`
  appearance: none;
  border: none !important;
  border-radius: 0;
  color: ${theme.colors.darkestGrey};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #f6f6f4;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0.875rem;
  letter-spacing: 0.016rem;
  width: 75%;
  height: 80%;

  ::placeholder {
    color: #7f7f80;
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  ${({ value, expanded }) =>
    value &&
    expanded &&
    `
    padding: 0 !important;
  `}

  ${({ expanded }) =>
    expanded &&
    `
    padding-left: 0 !important;
  `}
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(theme.colors.white, 0.8)};
  cursor: pointer;
  z-index: 10;
`;
