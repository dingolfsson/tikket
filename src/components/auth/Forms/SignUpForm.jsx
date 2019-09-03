import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { phone } from './validate'

class SignUpForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Message size='tiny' error>
          <Message.Header>{error}</Message.Header>
        </Message>
      )
    }
  }

  renderInput = ({ input, label, meta, required = false, type = 'text', icon }) => {
    return (
      <Form.Field error={meta.error && meta.touched} required={required} >
        <label>{label}</label>
        <Input icon={icon} iconPosition='left' {...input} autoComplete="off" type={type} />
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
        <Field name='name' icon='user' component={this.renderInput} label="Nafn" required={true} />
        <Form.Group widths='equal'>
          <Field name="room" icon='map marker alternate' component={this.renderInput} label="Stofa" />
          <Field name="phone" icon='phone' component={this.renderInput} label="Sími" normalize={phone} />
        </Form.Group>
        <Field name="email" icon='mail' component={this.renderInput} label="Póstfang" required={true} />
        <Form.Group widths='equal'>
          <Field name="password" icon='lock' component={this.renderInput} label="Lykilorð" type="password" required={true} />
          <Field name="confirmPassword" icon='lock' component={this.renderInput} label="Staðfesta lykilorð" type="password" required={true} />
        </Form.Group>
        <Button color='twitter' fluid size='large'>Stofna</Button>
      </Form >
    )
  }
};

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = 'Nafn vantar'
  }
  if (!formValues.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Skrítið póstfang..'
  }
  if (!formValues.password) {
    errors.password = 'Lykilorð vantar'
  } else if (formValues.password.length < 8) {
    errors.password = 'Short passw..'
  }
  if (formValues.confirmPassword !== formValues.password) {
    errors.confirmPassword = 'Ekki eins'
  }

  return errors;
}

export default reduxForm({
  form: 'signUpForm',
  validate
})(SignUpForm);
