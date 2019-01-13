import React, { Component } from 'react'
import { Form, Input, Checkbox, Grid, Header, Segment, Button, Message, Divider, GridColumn } from 'semantic-ui-react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Auth.css'

// TODO: Forgot password
// TODO: Remember me

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
                {authError ? <div className="invalid-feedback">Rangt netfang eða lykilorð</div> : null}

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

const mapStateToProps = (state) => {
  return {
    isLoaded: state.firebase.auth.isLoaded, // Gerir ekkert = TODO
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(actions.signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);