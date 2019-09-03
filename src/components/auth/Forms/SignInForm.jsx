import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Message } from 'semantic-ui-react'

class SignInForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Message size='tiny' error>
          <Message.Header>{error}</Message.Header>
        </Message>
      )
    }
  }

  renderInput = ({ input, placeholder, meta, required = false, type = 'text', icon }) => {
    return (
      <Form.Field error={meta.error && meta.touched} required={required} >
        <Input icon={icon} iconPosition='left' {...input} autoComplete="off" type={type} placeholder={placeholder} />
        {this.renderError(meta)}
      </Form.Field>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)} error>
        <Field name="email" icon='mail' component={this.renderInput} placeholder='Póstfang' />
        <Field name="password" icon='lock' component={this.renderInput} placeholder='Lykilorð' type="password" />
        <Button color='twitter' fluid size='large'>Stofna</Button>
      </Form >
    )
  }
};

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Skrítið póstfang..'
  }
  return errors;
}

export default reduxForm({
  form: 'signInForm',
  validate
})(SignInForm);
