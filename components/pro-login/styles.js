import styled from '@emotion/styled';

const PRO_GREY = '#555';
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
  width: 100vw;
  height: 100vh;
  background: ${PRO_GREY};
  z-index: 9999;
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
    font-weight: 400;
    font-size: 14px;
    padding: 0 0 5px 0;
  }

  .checkbox-option {
    margin: 0;
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

export const LoginTitle = styled.h3`
  color: ${PRO_GREY};
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 0 0 30px 0;
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
