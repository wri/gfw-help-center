import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

import CloseIconSrc from 'assets/icons/close.svg';

const PRO_GREY = '#343534';
const WHITE = '#FFF';

export const LogoContainer = styled.div`
  width: 96px;
  margin: 30px auto 0 auto;
  img {
    width: inherit;
  }
`;

export const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  padding-bottom: 30px;
  width: 100vw;
  height: 100vh;
  background: ${PRO_GREY};
  z-index: 9999;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const ForgotPasswordLink = styled.a`
  position: absolute;
  right: 0;
  font-size: 14px;
  top: -2px;
  color: #97bd3d;
  &:hover {
    text-decoration: underline;
  }
`;

export const LoginContainer = styled.section`
  background: ${WHITE};
  min-width: 430px;
  max-width: 400px;
  position: relative;

  margin: 50px auto 0 auto;
  padding: 30px;

  .label {
    text-transform: capitalize;
    font-weight: 400 !important;
    color: #777777 !important;
    font-size: 14px;
    padding: 0 0 5px 0;
  }

  .checkbox-option {
    margin: 0 !important;
  }

  .input-field input {
    border: 1px solid #e5e5de;
    border-radius: 0px;
  }

  .submit-btn {
    display: inline-block;
    width: 100%;
  }
`;

export const RememberMeWrapper = styled.div`
  .label {
    display: none !important;
  }
  .checkbox-option {
    margin: 0;
  }
`;

export const LoginTitle = styled.h3`
  color: ${PRO_GREY};
  font-size: 21px;
  font-weight: 500;
  line-height: 1.3em;
  padding: 35px 0 20px 0;
`;

export const LoginDescription = styled.p`
  color: #777777;
  font-size: 14px;
  padding: 0 0 30px 0;
  line-height: 25px;
`;

export const RequestAccountTitle = styled.div`
  position: relative;
  text-align: center;
  display: block;
  margin: 20px 0 0 0;

  span {
    position: relative;
    padding: 0 15px;
    font-size: 14px;
    color: ${PRO_GREY};
    background: ${WHITE};
  }

  &:before {
    content: '';
    background: ${PRO_GREY};
    position: absolute;
    height: 1px;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const RequestAccountBtn = styled.a`
  font-size: 14px;
  background: none;
  border-radius: 100px;
  border: 1px solid #97bd3d;
  text-transform: uppercase;
  font-family: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  text-align: center;
  color: ${PRO_GREY};
  padding: 12px 0;
  margin: 20px 0 0 0;
`;

export const LoginErrorModal = styled.div`
  button {
    margin: 30px 0 0 0;
  }
`;

export const CloseIcon = styled(CloseIconSrc)`
  position: fixed;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  top: 20px;
  right: 20px;
  fill: ${theme.colors.white};
  cursor: pointer;
`;
