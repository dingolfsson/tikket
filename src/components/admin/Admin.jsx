import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Loader, Dimmer } from 'semantic-ui-react';
import AdminCardSeq from './AdminCardSeq';
import TicketList from '../tickets/TicketList';
import UserList from '../user/UserList';

// TODO: Sækja daga á beiðnum. X beiðnir síðustu Y daga.
// TODO. Superadmins
// TODO: New users last X days.
class Admin extends Component {
  state = {
    ticks: null,
    solveds: [],
    adminss: [],
    loaded: false,
    checkoutTickets: false,
    checkoutUsers: false
  }

  componentDidMount() {
    const { admin } = this.props;
    if (!admin) {
      this.props.history.push('/');
    }
  }

  clickOnTickets(tickets) {
    this.setState({ checkoutTickets : true, coTicks : tickets })
  }
  
  clickOnUsers(users) {
    this.setState({ checkoutUsers : true, coUsers : users })
  }

  render() {
    const { notifications, tickets, users } = this.props;
    const { checkoutTickets, coTicks, checkoutUsers, coUsers } = this.state;
    const tick = tickets && tickets.map(item => item)
    const priority = tick && tick.filter(item => item.priority && !item.solved)
    const unsolved = tick && tick.filter(item => !item.solved)
    const admins = users && users.filter(item => item.admin)
    const superAdmins = users && users.filter(item => item.superAdmin)
    if (tickets === undefined || unsolved === undefined || admins === undefined || superAdmins === undefined) {
      return (
        <Dimmer active inverted>
          <Loader size='massive' inline='centered'>Sæki gögn</Loader>
        </Dimmer>
      )
    }
    if (!checkoutTickets && !checkoutUsers) {
      return (
        <Container style={{ marginTop: '8em' }}>
          <AdminCardSeq 
          {...this.props}
          clickOnTickets={this.clickOnTickets.bind(this)}
          clickOnUsers={this.clickOnUsers.bind(this)}
          priority={priority} notifications={notifications}
          unsolved={unsolved} admins={admins}
          superAdmins={superAdmins}/>
        </Container >
      ) 
    }

    if (checkoutTickets) {
      return (
        <Container>
          <TicketList tickets={coTicks}/>
          <button onClick={() => this.setState({checkoutTickets : false})}>Til baka</button>
        </Container>
      )
    }
    else if (checkoutUsers) {
      return (
        <Container>
          <UserList users={coUsers}/>
          <button onClick={() => this.setState({checkoutUsers : false})}>Til baka</button>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  return {
    tickets: state.firestore.ordered.tickets,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    admin: admin,
  }
}
// export default Admin;
export default compose(
  firestoreConnect([
    { collection: 'tickets', orderBy: ['createdAt', 'desc'] },
    { collection: 'users' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ]),
  connect(mapStateToProps),
)(Admin)
