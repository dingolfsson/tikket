import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Card, Icon, Grid, Header, Segment, Button, Message, Divider, FormCheckbox } from 'semantic-ui-react';
import { createTicket } from '../../store/actions/ticket';

import './CreateTicket.css';

class CreateTicket extends Component {
  state = {
    title: '',
    description: '',
    solved: false,
    attachement: '',
    priority: false,
    selectedOption: 'computer',
    seenByAdmin: false,
    assignedAgent: null,
  }

  // handleOptionChange: function
  // @params value
  // @setState selectedOption
  handleOptionChange = (value) => {
    this.setState({
      selectedOption: value
    });
  }

  // handleCheckClick: function
  // @params e: event
  // @setState priority
  handleCheckClick = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    this.setState({
      priority: value
    })
  }

  // handleChange: function
  // @params e: evente
  // @setState change value of keys
  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  // handleSubmit: function
  // @params e: event
  // @dispatch createTicket
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createTicket(this.state);
  }

  // handleCancel: function
  // @history: push
  handleCancel = () => {
    this.props.history.push('/');
  }

  // handleSuccess: function
  // @history: push
  handleSuccess = () => {
    setTimeout(() => {
      this.props.history.push('/');
    }, 4000);
  }

  // render: function
  // @return jsx
  render() {
    // priority: boolean (default: false)
    const { priority } = this.state;
    // success: boolean (default: false)
    const { success } = this.props;

    // onSubmit: true
    if (success) {
      this.handleSuccess();
    }

    // jsx
    return (
      <div className="login-form" style={{ marginTop: '2em' }}>
        <Grid textAlign='center' className='grid-style' verticalAlign='middle'>
          <Grid.Column textAlign='left' className='grid-column'>
            {!success ? (
              <React.Fragment>
                <Form size='massive' onSubmit={this.handleSubmit}>
                  <Segment>
                    <Header as='h1' textAlign='center'>
                      <Header.Content>
                        Ný beiðni
              </Header.Content>
                    </Header>
                    <Form.Group widths='equal'>
                      <Form.Input id='title' icon='user' iconPosition='left' label='Titill' placeholder='Kemst ekki á netið / Bilaður prentari...' onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group widths='equal' >
                      <Form.TextArea id='description' label='Lýsing á vandamálinu' placeholder='Nánari lýsing á vandamálinu...' onChange={this.handleChange} />
                    </Form.Group>
                    <Divider />
                    <Card.Group itemsPerRow={2}>
                      <Card id='computer' color={this.state.selectedOption === 'computer' ? 'red' : null} onClick={() => this.handleOptionChange('computer')}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Icon size='big' name='computer' />
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Card.Header>Tölva</Card.Header>
                                <Card.Meta>Borð- eða fartölva</Card.Meta>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                      <Card id='paw' color={this.state.selectedOption === 'paw' ? 'blue' : null} onClick={() => this.handleOptionChange('paw')}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Icon size='big' name='paw' />
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Card.Header>Nemandi</Card.Header>
                                <Card.Meta>Spjaldtölva / Póstfang</Card.Meta>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                      <Card id='wifi' color={this.state.selectedOption === 'wifi' ? 'purple' : null} onClick={() => this.handleOptionChange('wifi')}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Icon size='big' name='wifi' />
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Card.Header>Net</Card.Header>
                                <Card.Meta>Kemst ekki á netið</Card.Meta>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                      <Card id='at' color={this.state.selectedOption === 'at' ? 'yellow' : null} onClick={() => this.handleOptionChange('at')}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Icon size='big' name='at' />
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Card.Header>Tölvupóstur</Card.Header>
                                <Card.Meta>Bilað / Stofna nýtt</Card.Meta>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                      <Card id='print' color={this.state.selectedOption === 'print' ? 'teal' : null} onClick={() => this.handleOptionChange('print')}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Icon size='big' name='print' />
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Card.Header>Prentari</Card.Header>
                                <Card.Meta>Litur eða S/H</Card.Meta>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                      <Card id='question' color={this.state.selectedOption === 'question' ? 'black' : null} onClick={() => this.handleOptionChange('question')}>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Icon size='big' name='question' />
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Card.Header>Annað</Card.Header>
                                <Card.Meta>Fyrir allt annað</Card.Meta>

                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                    </Card.Group>
                    <Divider />
                    <FormCheckbox label='Áríðandi' id='priority' checked={priority} onClick={this.handleCheckClick} />
                    <Button.Group widths={2}>
                      <Button basic onClick={this.handleCancel}>Til baka</Button>
                      <Button basic color='green' fluid size='large'
                      >
                        Senda beiðni
                </Button>
                    </Button.Group>
                  </Segment>
                </Form>
              </React.Fragment>
              // onSumbit: Success
            ) : (
                <Message
                  positive
                  icon='check'
                  header='Beiðni send!'
                  content='Þú verður færður aftur á forsíðu.'
                />
              )}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

// mapStateToProps: function
// @params state
// return [success: boolean]
const mapStateToProps = (state) => {
  // Return: Properties for the component
  // success: boolean (default: false)
  return {
    success: state.ticket.success
  }
}

// mapDispatchToProps: function
// @params dispatch
// @return dispatch action
const mapDispatchToProps = (dispatch) => {
  return {
    createTicket: (ticket) => dispatch(createTicket(ticket))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket)