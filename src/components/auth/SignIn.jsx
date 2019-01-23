import React, { Component } from 'react'
import { Form, Checkbox, Grid, Header, Segment, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
import './SignIn.css'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    // render: function
    // @return jsx
    render() {
        const { authError } = this.props;

        return (
            <div className="login-form">
                <Grid textAlign='center' className='grid-style' verticalAlign='middle'>
                    <Grid.Column className='grid-column'>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment>
                                <Header as='h1' textAlign='center'>
                                    Innskráning
                                    </Header>
                                <Form.Input fluid icon='mail' iconPosition='left' placeholder='Póstfang' id='email' onChange={this.handleChange} required />
                                <Form.Input fluid icon='lock'
                                    iconPosition='left' type='password' placeholder='Lykilorð' id='password' onChange={this.handleChange} required />
                                <Grid>
                                    <Grid.Column floated='left' width={6}>
                                        <Form.Field className='remember' control={Checkbox} label={{ children: 'Muna eftir mér' }} />

                                    </Grid.Column>
                                    <Grid.Column floated='right' width={6}>
                                        <Link className='forgot-password' to='#'>Gleymt lykilord?</Link>
                                    </Grid.Column>
                                </Grid>
                                {authError ?
                                    <div className="invalid-feedback">Rangt netfang eða lykilorð</div>
                                    :
                                    <div className="invalid-feedback"></div>}

                                <Button color='twitter' fluid size='large'>
                                    Innskrá
                                    </Button>
                                <Message>
                                    Ekki með aðgang? <Link to='/new'><span className='second-info'>Nýskráning</span></Link>
                                </Message>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

// mapStateToProps: function
// params state
// @return [isLoaded, authError, auth]
const mapStateToProps = (state) => {
    // Return: Properties for the component
    // isLoaded: bool (default: false)
    // authError: string (default: '')
    // auth: object
    return {
        isLoaded: state.firebase.auth.isLoaded,
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

// mapDispatchToProps: function
// @params dispatch
// @return dispatch action
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(actions.signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);