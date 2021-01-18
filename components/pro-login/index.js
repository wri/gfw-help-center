import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import ProLogo from 'assets/images/GFW_PRO-logo.png';

import { Form, Submit, Input, Modal, Button } from 'gfw-components';

import {
  LoginWrapper,
  LogoContainer,
  LoginContainer,
  LoginTitle,
  RequestAccountTitle,
  RequestAccountBtn,
  LoginErrorModal,
} from './styles';

const ProLogin = () => {
  const [open, setIsOpen] = useState(false);

  const handleSubmit = (props) => {
    fetch('/help/api/pro', {
      method: 'POST',
      body: JSON.stringify(props),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.pro) {
          window.location.reload();
        } else {
          setIsOpen(true);
        }
      });
  };

  return (
    <LoginWrapper>
      <LogoContainer>
        <img src={ProLogo} alt="GFW Pro" />
      </LogoContainer>
      <LoginContainer>
        <Form onSubmit={handleSubmit}>
          {({ handleSubmit: handleSubmitCallback }) => (
            <form onSubmit={handleSubmitCallback}>
              <LoginTitle>Log in to GFW Pro to continue</LoginTitle>
              <Input name="username" label="Username" required />
              <Input
                name="password"
                label="Password"
                type="password"
                required
              />
              <Submit>Login</Submit>
            </form>
          )}
        </Form>
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

ProLogin.propTypes = {};

export default ProLogin;
