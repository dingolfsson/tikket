import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Container, Loader, Dimmer } from 'semantic-ui-react'
import TicketList from '../tickets/TicketList'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    const { tickets, auth, admin } = this.props
    // Data: Users can only see their own tickets
    let tick = tickets && tickets.filter(item => item.authorId === auth.uid)
    // Condition: Admins can see all tickets
    if (admin) {
      tick = tickets && tickets.map(item => item)
    }

    // Condition:  While tickets are being fetched, a load screen is displayed
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
  // Return: Properties for the component
  // tickets: objects
  // auth: object
  // admin: boolean (default: false)
  return {
    tickets: state.firestore.ordered.tickets,
    auth: state.firebase.auth,
    admin: admin
  }
}

export default compose(
  firestoreConnect([
    { collection: 'tickets', orderBy: ['createdAt', 'desc'] }
  ]),
  connect(mapStateToProps)
)(Dashboard)
