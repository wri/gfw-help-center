import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ProLogo from 'assets/images/GFW_PRO-logo.png';

import { Form, Submit, Input, Checkbox, Modal, Button } from 'gfw-components';

import {
  LoginWrapper,
  LogoContainer,
  LoginContainer,
  LoginTitle,
  LoginDescription,
  InputWrapper,
  ForgotPasswordLink,
  RequestAccountTitle,
  RequestAccountBtn,
  LoginErrorModal,
  RememberMeWrapper,
  CloseIcon,
} from './styles';

const ProLogin = ({ independent, verificationRequired }) => {
  const [open, setIsOpen] = useState(false);
  const [verification, setVerification] = useState(
    verificationRequired || false
  );

  const handleSubmit = (props) => {
    fetch('/help/api/pro', {
      method: 'POST',
      body: JSON.stringify(props),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response?.pro) {
          if (independent) {
            window.location.href = `${window.location.origin}/help/gfw-pro/`;
          } else {
            window.location.reload();
          }
        } else if (response?.proVerificationRequired) {
          setVerification(true);
        } else {
          setIsOpen(true);
        }
      });
  };

  const referBack = () => {
    window.location.href = `${window.location.origin}/help/gfw-pro/`;
  };

  return (
    <LoginWrapper>
      <CloseIcon onClick={referBack} />
      <LogoContainer>
        <img src={ProLogo} alt="GFW Pro" />
      </LogoContainer>
      <LoginContainer>
        <Form onSubmit={handleSubmit}>
          {({ handleSubmit: handleSubmitCallback }) => (
            <form onSubmit={handleSubmitCallback}>
              <LoginTitle>
                Login with your GFW Pro account to continue
              </LoginTitle>
              {!verification && (
                <LoginDescription>
                  Log in with your GFW Pro credentials is required to view GFW
                  Pro training resources, such as step-by-step instructions,
                  videos and more.
                </LoginDescription>
              )}
              {verification && (
                <LoginDescription>
                  Enter the code that was emailed to you.
                </LoginDescription>
              )}
              {verification && (
                <InputWrapper>
                  <Input name="verify" label="Verification code" required />
                </InputWrapper>
              )}
              {!verification && (
                <>
                  <InputWrapper>
                    <Input name="username" label="Username" required />
                  </InputWrapper>
                  <InputWrapper>
                    <ForgotPasswordLink
                      target="__BLANK"
                      rel="noreferrer"
                      href="https://pro.globalforestwatch.org/forgot"
                    >
                      Forgot your password?
                    </ForgotPasswordLink>
                    <Input
                      name="password"
                      label="Password"
                      type="password"
                      required
                    />
                  </InputWrapper>
                </>
              )}
              <RememberMeWrapper>
                <Checkbox
                  name="remember"
                  options={[
                    {
                      label: 'Remember me',
                      value: true,
                    },
                  ]}
                />
              </RememberMeWrapper>
              <Submit>{verification ? 'Verify' : 'Login'}</Submit>
            </form>
          )}
        </Form>
        {!verification && (
          <>
            <RequestAccountTitle>
              <span>Don&apos;t have an account?</span>
            </RequestAccountTitle>
            <RequestAccountBtn
              href="https://pro.globalforestwatch.org/account"
              target="__BLANK"
              rel="noreferrer"
            >
              Request an account
            </RequestAccountBtn>
          </>
        )}
      </LoginContainer>
      <Modal
        title="Unable to login"
        open={open}
        onRequestClose={() => setIsOpen(false)}
      >
        <LoginErrorModal>
          <p>Failed to authenticate user.</p>
          <Button className="login-error-btn" onClick={() => setIsOpen(false)}>
            Ok
          </Button>
        </LoginErrorModal>
      </Modal>
    </LoginWrapper>
  );
};

ProLogin.propTypes = {
  verificationRequired: PropTypes.bool.isRequired,
  independent: PropTypes.bool,
};

export default ProLogin;
