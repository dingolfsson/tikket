import React, { Component } from 'react'
import { Form, Input, Checkbox, Grid, Header, Segment, Button, Message, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Auth.css'

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

    return (
      <div className="login-form">
        <Grid textAlign='center' className='grid-style' verticalAlign='middle'>
          <Grid.Column className='grid-column'>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Header as='h1' textAlign='center'>
                  Innskráning
            </Header>
                <Divider />
                <Form.Input fluid icon='mail' iconPosition='left' placeholder='Póstfang' id='email' onChange={this.handleChange} required />
                <Form.Input fluid icon='lock'
                  iconPosition='left' type='password' placeholder='Lykilorð' id='password' onChange={this.handleChange} required />

                <Grid.Column floated='left'>
                  <Form.Field control={Checkbox} label='Muna eftir mér' />
                </Grid.Column>
                <Grid.Column floated='right'>
                  <a href='#'>Gleymt lykilord?</a>
                </Grid.Column>

                <Divider />
                <Button color='green' fluid size='large'>
                  Innskrá
                </Button>
                <Message>
                  Ekki með aðgang? <Link to='/new'>Nýskráning</Link>
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