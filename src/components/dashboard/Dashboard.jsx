import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Loader, Dimmer } from 'semantic-ui-react';
import './Dashboard.css'

import TicketList from '../tickets/TicketList';

class Dashboard extends Component {

  render() {
    const { tickets, auth, admin } = this.props;
    let tick = tickets && tickets.filter(item => item.authorId === auth.uid)
    if (admin) {
      tick = tickets && tickets.map(item => item)
    }

    if (!tickets) {
      return (
        <Dimmer active inverted>
          <Loader size='massive' inline='centered'>Sæki gögn</Loader>
        </Dimmer>
      )
    }

    return (
      <div>
        <Container text style={{ marginTop: '7em' }}>
          <TicketList tickets={tick} />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  return {
    tickets: state.firestore.ordered.tickets,
    auth: state.firebase.auth,
    admin: admin
  }
}

export default compose(
  firestoreConnect([
    { collection: 'tickets', orderBy: ['createdAt', 'desc'] },
  ]),
  connect(mapStateToProps),
)(Dashboard)