import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Submit,
  Checkbox,
  Input,
  validations,
  Loader,
} from 'gfw-components';

import { LoginWrapper } from './styles';

const handleSubmit = props => {
  console.log('submit', props);
  const r = fetch('/help/api/pro-login', {
    method: 'POST',
    body: JSON.stringify({
      ...props,
      persist: props.persist.length > 0
    })
  });
}

const ProLogin = ({ links }) => (
  <LoginWrapper>
    <Form onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h1>Log in to GFW Pro to continue</h1>
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
    Please login
  </LoginWrapper>
);

ProLogin.propTypes = {
  // links: PropTypes.array,
};

export default ProLogin;
