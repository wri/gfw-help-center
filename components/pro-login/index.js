import React from 'react';
import PropTypes from 'prop-types';

import ProLogo from 'assets/images/GFW_PRO-logo.png';

import {
  Form,
  Submit,
  Checkbox,
  Input,
  validations,
  Loader,
} from 'gfw-components';

import {
  LoginWrapper,
  LogoContainer,
  LoginContainer,
  LoginTitle,
  RequestAccountTitle,
  RequestAccountBtn
} from './styles';

const handleSubmit = props => {
  fetch('/help/api/pro', {
    method: 'POST',
    body: JSON.stringify({
      ...props,
      persist: props.persist ? props.persist.length > 0 : false
    })
  }).then(r => r.json()).then(response => {
    if (response.pro) {
      window.location.reload();
    }
    // TODO: Error handling
  })
}

const ProLogin = ({ links }) => (
  <LoginWrapper>
    <LogoContainer>
      <img src={ProLogo} alt="GFW Pro" />
    </LogoContainer>
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LoginTitle>Log in to GFW Pro to continue</LoginTitle>
            <Input
              name="username"
              label="Username"
              required
            />
            <Input
              name="password"
              label="Password"
              type="password"
              required
            />
            <Checkbox
              name="persist"
              label=""
              options={[
                {
                  label: 'Remember me',
                  value: '0'
                }
              ]}
            />
            <Submit>
              Login
            </Submit>
          </form>
      )}
    </Form>
    <RequestAccountTitle><span>Don't have an account?</span></RequestAccountTitle>
    <RequestAccountBtn
      href="https://pro.globalforestwatch.org/account"
      target="__BLANK"
      rel="noreferrer"
    >Request an account</RequestAccountBtn>
    </LoginContainer>
  </LoginWrapper>
);

ProLogin.propTypes = {
  // links: PropTypes.array,
};

export default ProLogin;
