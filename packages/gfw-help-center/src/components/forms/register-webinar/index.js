import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Form, Submit, Checkbox, Input, validations, Loader } from 'gfw-components';

import Message from '../../message';

import postRequest from './actions';
import { AgreeBoxWrapper, Title } from './styles';

const RegisterWebinarForm = () => {
  const { email } = validations;

  return (
    <Form onSubmit={postRequest} initialValues={{ agree: ['agree'] }}>
      {({ handleSubmit, submitting, submitSucceeded }) => submitSucceeded ? (
        <Message small title="You are now registered!" description="Check your email for confirmation." />
      ) : (
        <>
          {submitting && <Loader />}
          <Title>Registration</Title>
          <form onSubmit={handleSubmit}>
            <Input name="name" label="name" required />
            <Input type="email" name="email" label="email" validate={[email]} placeholder="example@globalforestwatch.org" required />
            <Input type="textarea" name="topic" label="How does this topic apply to your work?" />
            <AgreeBoxWrapper>
              <Checkbox
                name="agree"
                options={[
                  {
                    label: "I have read and agree to GFW's privacy policy",
                    value: 'agree',
                  },
                ]}
                required
              />
            </AgreeBoxWrapper>
            <Submit submitting={submitting}>
              Register
            </Submit>
          </form>
        </>
      )}
    </Form>
  );
};

RegisterWebinarForm.propTypes = {
};

export default connect(RegisterWebinarForm);
