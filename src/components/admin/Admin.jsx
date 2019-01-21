import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Grid, Loader, Dimmer } from 'semantic-ui-react';
import moment from 'moment';

import AdminCards from './AdminCards'
import AdminNotifications from './AdminNotifications'

class Admin extends Component {

  // componentDidMount: function lifecycle
  componentDidMount() {
    const { admin } = this.props;
    // if: user isn't an admin, he'll be
    // moved to the Dashboard
    if (!admin) {
      this.props.history.push('/');
    }
  }

  pastDaysCalc(days, data) {
    const dateSince = _.map(data, 'createdAt')
    const pastSevenDays = dateSince.filter(item =>
      (moment(item.toDate()).isBetween(moment().subtract(days, 'days'), moment()))
    ).length

    return pastSevenDays
  }
  // render: function
  // @return jsx
  render() {
    const { notifications, tickets, users } = this.props;

    if (!notifications || !tickets || !users) {
      return (
        <Dimmer active inverted>
          <Loader size='massive' inline='centered'>Sæki gögn</Loader>
        </Dimmer>
      )
    }

    const priority = _.filter(tickets, { 'priority': true, 'solved': false })
    const solved = _.filter(tickets, { 'solved': false })
    const admins = _.filter(users, { 'admin': true })
    const superAdmins = _.filter(users, { 'superAdmin': true })

    console.log(users)

    // Initilize: various properties are gathered that are
    //            required to populate cards and notifications
    return (
      <Container style={{ marginTop: '8em' }}>
        <Grid>
          <Grid.Row>
            <AdminCards title={'Beiðnir'} info={tickets} icon={'check circle'} iconText={`${this.pastDaysCalc(7, tickets)} Síðustu 7 daga`} color={'green'} secondaryIcon={'clock'} />
            <AdminCards title={'Óleystar'} info={solved} icon={'question circle'} iconText={priority.length + ' áríðandi'} color={'teal'} secondaryIcon={'exclamation circle'} />
            <AdminCards title={'Notendur'} info={users} icon={'user'} iconText={`${this.pastDaysCalc(10, users)} Síðustu 10 daga`} color={'orange'} secondaryIcon={'clock'} />
            <AdminCards title={'Stjórnendur'} info={admins} icon={'key'} iconText={superAdmins.length + ' ofur'} color={'yellow'} secondaryIcon={'chess queen'} />
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={16}>
            <AdminNotifications notifications={notifications} />
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

// mapStateToProps: function
// params state
// return [ticket, users, auth, notifications, admin]
const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  // Return: Properties for the component
  // console.log(state.firestore)
  return {
    auth: state.firebase.auth,
    admin: admin,
    tickets: state.firestore.ordered.tickets,
    users: state.firestore.ordered.users,
    notifications: state.firestore.ordered.notifications
  }
}

// Gathering required values when the component is loaded.
export default compose(
  firestoreConnect([
    { collection: 'tickets' },
    { collection: 'users' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ]),
  connect(mapStateToProps),
)(Admin)
