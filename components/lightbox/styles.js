import styled from '@emotion/styled';

export const Image = styled.img`
  cursor: pointer;
`;

export const Wrapper = styled.div`
  cursor: zoom-out;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  justify-items: center;
  padding: 2%;
`;

export const Backdrop = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.8;
`;

export const LightboxImg = styled.img`
  position: relative;
  object-fit: scale-down !important;
`;
