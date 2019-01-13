import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import faker from 'faker';
import { Table, Container, Grid, Breadcrumb, List, Button, Loader, Icon, Segment, Card, Image, Feed, AccordionTitle } from 'semantic-ui-react'
import moment from 'moment';

// TODO: Make solved a dispatch
// TODO: Card Meta = authorTitle

class TicketDetails extends Component {

  render() {
    const { ticket, auth, admin } = this.props;
    const id = this.props.match.params.id;
    console.log(ticket)
    if (!ticket) {
      return <Loader />
    }

    return (
      <Container style={{ marginTop: '8em' }}>
        <Breadcrumb>
          <Breadcrumb.Section link>Beiðnir</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section link>{ticket.authorName}</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section active>{id}</Breadcrumb.Section>
        </Breadcrumb>
        <Segment color='blue' padded>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4}>
                <Card>
                  <Card.Content>
                    {/* <Icon floated='left' size='tiny' src={faker.image.avatar()} circular /> */}
                    <Icon floated='left' size='large' name='user circle' circular />
                    <Card.Header>{ticket.authorName}</Card.Header>
                    <Card.Meta>Skólastjóri</Card.Meta>
                    <Card.Description>
                      <List>
                        <List.Item>
                          <List.Icon name='building' />
                          <List.Content>{ticket.room}</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='phone' />
                          <List.Content>{ticket.phone}</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='mail' />
                          <List.Content>
                            <a href={'mailto:' + ticket.email}>{ticket.email}</a>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={12}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{ticket.title} {ticket.priority ? <Icon color='red' name='exclamation' /> : null}</Card.Header>
                    {/* <Card.Meta content={ticket.selectedOption} /> */}
                    <Card.Meta content={<Icon name={ticket.selectedOption} />} />
                    {/* <Card.Description content={faker.lorem.sentence(20)} /> */}
                    <Card.Description content={ticket.description} />
                    {/* <Card.Description content={ticket.description} /> */}
                  </Card.Content>
                  <Card.Content extra>
                    <Button basic color='green'>
                      Leysa
          </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const admin = state.firebase.profile.admin;
  const id = ownProps.match.params.id;
  const ticket = state.firestore.data.tickets ? state.firestore.data.tickets[id] : null;
  return {
    ticket: ticket,
    auth: state.firebase.auth,
    admin: admin
  }
}

export default compose(
  firestoreConnect([
    { collection: 'tickets' }
  ]),
  connect(mapStateToProps)
)(TicketDetails)