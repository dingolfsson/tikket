import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Form, Button, Loader, Dimmer, Grid, Header, Divider } from 'semantic-ui-react';
import './User.css'

class User extends Component {
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
        fieldValidationErrors[name] = validity[name] ? '' : 'Lykilorð verður að vera amk. 12 stafir';
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

  errorClass(error) {
    return (error.length === 0 ? '' : 'is-invalid');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.signUp(this.state.form);
    console.log(this.state.form)
  }


  render() {
    const { users, auth, admin } = this.props;
    if (users) {
      const tmp = users.filter(user => user.id === auth.uid)
      console.log(tmp)
    }
    // console.log(auth.uid === users.id)
    // if (!tickets) {
    //   return (
    //     <Dimmer active inverted>
    //       <Loader size='massive' inline='centered'>Sæki gögn</Loader>
    //     </Dimmer>
    //   )
    // }

    return (
      <div>

        <Container text style={{ marginTop: '7em' }}>
          <Header>Aðgangur - í vinnslu</Header>
          <Divider clearing />
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header
                  as='h4'
                  content='Upplýsingar'
                  subheader='Þú getur uppfært þínar upplýsingar' />
              </Grid.Column>
              <Grid.Column width={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Input id='name' icon='user' iconPosition='left' label='Nafn' placeholder='Jón Jónsson' onChange={this.handleChange} />
                  </Form.Group>
                  <div className="invalid-feedback">{this.state.formErrors.name}</div>
                  <Form.Group widths='equal'>
                    <Form.Input id='room' icon='map marker alternate' iconPosition='left' label='Kennslustofa' placeholder='42' onChange={this.handleChange} />
                    <Form.Input id='phone' icon='phone' iconPosition='left' label='Sími' placeholder='555-1234' onChange={this.handleChange} />
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <Grid.Column width={4}>
                <Header
                  as='h4'
                  content='Aðgangur'
                  subheader='Innskráning og annað' />
              </Grid.Column>
              <Grid.Column width={12}>
                <Form onSubmit={this.handleSubmit}>

                  <Form.Group widths='equal'>
                    <Form.Input className={this.errorClass(this.state.formErrors.email)} id='email' icon='mail' iconPosition='left' label='Póstfang' placeholder='jon@kopavogur.is' onChange={this.handleChange} />
                  </Form.Group>
                  <div className="invalid-feedback">{this.state.formErrors.email}</div>
                  <Form.Group>
                    <Form.Input id='oldPassword' icon='lock' iconPosition='left' type='password' label='Gamla lykilorðið' placeholder='Gamla lykilorðið' onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input id='password' icon='lock' iconPosition='left' type='password' label='Nýja Lykilorðið' placeholder='Lykilorð' onChange={this.handleChange} />
                    <Form.Input id='confirmPassword' icon='lock' iconPosition='left' type='password' label='Nýja Lykilorðið aftur' placeholder='Lykilorð aftur' onChange={this.handleChange} />
                  </Form.Group>
                  <div className="invalid-feedback">{this.state.formErrors.password}</div>
                  <div className="invalid-feedback">{this.state.formErrors.confirmPassword}</div>
                </Form>
                <Button color='twitter' floated='right'>Vista breytingar</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  return {
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    admin: admin
  }
}

// export default connect(mapStateToProps)
//   (Dashboard)

export default compose(
  firestoreConnect([
    { collection: 'users' },
  ]),
  connect(mapStateToProps),
)(User)