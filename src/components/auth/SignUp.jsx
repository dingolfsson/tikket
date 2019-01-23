import React, { Component } from 'react'
import { Form, FormCheckbox, Grid, Header, Segment, Button, Message, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/auth';
import { Link } from 'react-router-dom';
import './SignUp.css'

class SignUp extends Component {
    state = {
        form: {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            phone: '',
            room: null,
            admin: false,
            superAdmin: false,
        },
        errors: {},
        formErrors: { email: '', name: '', password: '', confirmPassword: '' },
        formValidity: { email: false, name: false, password: false, confirmPassword: false },
        canSumbit: false,
    }

    // Remove: Not used in production build.
    handleCheckClick = (e) => {
        const key = e.target.id;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                [key]: value
            }
        })
    }

    // Update: state form
    handleChange = (e) => {
        const { form } = this.state;
        const { id, value } = e.target
        this.setState({
            form: {
                ...form,
                [id]: value
            }
        },
            () => { this.validateField(id, value) });
    }

    // Temporary validation for fields
    validateField(name, value) {
        const fieldValidationErrors = this.state.formErrors
        const validity = this.state.formValidity
        const isEmail = name === "email"
        const isPassword = name === "password"
        const isConfirmPassword = name === "confirmPassword"
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        validity[name] = value.length > 0
        fieldValidationErrors[name] = validity[name] ? '' : 'Nafn vantar';

        if (validity[name]) {
            if (isEmail) {
                validity[name] = emailTest.test(value);
                fieldValidationErrors[name] = validity[name] ? '' : 'Netfang verður að vera á réttu formi';
            }
            if (isPassword) {
                validity[name] = value.length >= 8;
                fieldValidationErrors[name] = validity[name] ? '' : 'Lykilorð verður að vera amk. 8 stafir';
            }
            if (isConfirmPassword) {
                validity[name] = value === this.state.form.password;
                fieldValidationErrors[name] = validity[name] ? '' : 'Lykilorð verða að vera eins';
            }
        }

        this.setState({
            ...this.state,
            formErrors: fieldValidationErrors,
            formValidity: validity,
        });
    }

    // For: Displaying error messages for incorrect fields.
    errorClass(error) {
        return (error.length === 0 ? '' : 'is-invalid');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state.form);
    }

    // render: function
    // @return jsx
    render() {
        const { admin, superAdmin } = this.state.form;
        return (
            <div className="login-form">
                <Grid textAlign='center' className='grid-style' verticalAlign='middle'>
                    <Grid.Column textAlign='left' className='grid-column'>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content>
                                        Stofna Aðgang
              </Header.Content>
                                </Header>
                                <Form.Group widths='equal'>
                                    <Form.Input id='name' icon='user' iconPosition='left' label='Nafn' placeholder='Jón Jónsson' onChange={this.handleChange} required />
                                </Form.Group>
                                <div className="invalid-feedback">{this.state.formErrors.name}</div>
                                <Form.Group widths='equal'>
                                    <Form.Input id='room' icon='map marker alternate' iconPosition='left' label='Kennslustofa' placeholder='42' onChange={this.handleChange} />
                                    <Form.Input id='phone' icon='phone' iconPosition='left' label='Sími' placeholder='555-1234' onChange={this.handleChange} />
                                </Form.Group>
                                <Divider />
                                <Form.Group widths='equal'>
                                    <Form.Input className={this.errorClass(this.state.formErrors.email)} id='email' icon='mail' iconPosition='left' label='Póstfang' placeholder='jon@kopavogur.is' onChange={this.handleChange} required />
                                </Form.Group>
                                <div className="invalid-feedback">{this.state.formErrors.email}</div>
                                <Form.Group widths='equal'>
                                    <Form.Input id='password' icon='lock' iconPosition='left' type='password' label='Lykilorð' placeholder='Lykilorð' onChange={this.handleChange} required />
                                    <Form.Input id='confirmPassword' icon='lock' iconPosition='left' type='password' label='Lykilorð aftur' placeholder='Lykilorð aftur' onChange={this.handleChange} required />
                                </Form.Group>
                                <div className="invalid-feedback">{this.state.formErrors.password}</div>
                                <div className="invalid-feedback">{this.state.formErrors.confirmPassword}</div>
                                <Divider />
                                <FormCheckbox label='Stjórnandi' id='admin' checked={admin} onClick={this.handleCheckClick} />
                                <FormCheckbox label='Ofur Stjórnandi' id='superAdmin' checked={superAdmin && admin} onClick={this.handleCheckClick} disabled={!this.state.form.admin} />
                                <Button color='twitter' fluid size='large' disabled={!(
                                    this.state.formValidity.email &&
                                    this.state.formValidity.name &&
                                    this.state.formValidity.password &&
                                    this.state.formValidity.confirmPassword)}>
                                    Stofna
                </Button>
                                <Message className="message-box">
                                    Með aðgang? <Link to='/'><span className='second-info'>Innskrá</span></Link>
                                </Message>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

// mapStateToPropsL function
// @params state
// @return [auth, authError]
const mapStateToProps = (state) => {
    // Return: Properties for the component
    // authError: string (default: '')
    // auth: object
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

// mapDispatchToProps: function
// @params dispatch
// @return dispatch action
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);