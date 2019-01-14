import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Grid, Loader, Dimmer } from 'semantic-ui-react';
import AdminCards from './AdminCards'
import AdminNotifications from './AdminNotifications'

// TODO: Sækja daga á beiðnum. X beiðnir síðustu Y daga.
// TODO. Superadmins
// TODO: New users last X days.
class Admin extends Component {
  state = {
    ticks: null,
    solveds: [],
    adminss: [],
    loaded: false,
  }

  componentDidMount() {
    const { admin } = this.props;
    if (!admin) {
      this.props.history.push('/');
    }
  }

  render() {
    const { notifications, tickets, users } = this.props;
    const tick = tickets && tickets.map(item => item)
    const priority = tick && tick.filter(item => item.priority && !item.solved)
    const solved = tick && tick.filter(item => !item.solved)
    const admins = users && users.filter(item => item.admin)
    const superAdmins = users && users.filter(item => item.superAdmin)

    if (tickets === undefined || solved === undefined || admins === undefined || superAdmins === undefined) {
      return (
        <Dimmer active inverted>
          <Loader size='massive' inline='centered'>Sæki gögn</Loader>
        </Dimmer>
      )
    }

    return (
      <Container style={{ marginTop: '8em' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={4} mobile={8}>
              <AdminCards title={'Beiðnir'} info={tickets} icon={'check circle'} iconText={'Síðustu 7 daga'} color={'green'} secondaryIcon={'clock'} />
            </Grid.Column >
            <Grid.Column computer={4} mobile={8}>
              <AdminCards title={'Óleystar'} info={solved} icon={'question circle'} iconText={priority.length + ' áríðandi'} color={'teal'} secondaryIcon={'exclamation circle'} />
            </Grid.Column>
            <Grid.Column computer={4} mobile={8}>
              <AdminCards title={'Notendur'} info={users} icon={'user'} iconText={'Síðustu 30 daga'} color={'orange'} secondaryIcon={'clock'} />
            </Grid.Column>
            <Grid.Column computer={4} mobile={8}>
              <AdminCards title={'Stjórnendur'} info={admins} icon={'key'} iconText={superAdmins.length + ' ofur'} color={'yellow'} secondaryIcon={'chess queen'} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <AdminNotifications notifications={notifications} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  return {
    tickets: state.firestore.ordered.tickets,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    admin: admin
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
