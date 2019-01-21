import React, { Component } from 'react';
import AdminCard from '../admin-card/AdminCard';
import AdminNotifications from '../admin-notifications/AdminNotifications';
import { Grid } from 'semantic-ui-react';
import { displayTicketList, displayUserList } from '../../actions/admin';

class AdminCardSeq extends Component {

    clickOnUsers(users) {
        const { dispatch } = this.props;
        dispatch(displayUserList(users))
    }

    clickOnTickets(tickets) {
        const { dispatch } = this.props;
        dispatch(displayTicketList(tickets))
    }

    render() {
        const { tickets, unsolved, priority, users, admins, superAdmins, notifications } = this.props;
        return (

            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={4} mobile={8}>
                        <AdminCard
                            title={'Beiðnir'} info={tickets} icon={'check circle'}
                            iconText={'Síðustu 7 daga'} color={'green'} secondaryIcon={'clock'}
                            clickFunction={this.clickOnTickets.bind(this)}
                        />
                    </Grid.Column >
                    <Grid.Column computer={4} mobile={8}>
                        <AdminCard
                            title={'Óleystar'} info={unsolved} icon={'question circle'}
                            iconText={priority.length + ' áríðandi'} color={'teal'} secondaryIcon={'exclamation circle'}
                            clickFunction={this.clickOnTickets.bind(this)}
                        />
                    </Grid.Column>
                    <Grid.Column computer={4} mobile={8}>
                        <AdminCard title={'Notendur'} info={users} icon={'user'}
                            iconText={'Síðustu 30 daga'} color={'orange'} secondaryIcon={'clock'}
                            clickFunction={this.clickOnUsers.bind(this)}
                        />
                    </Grid.Column>
                    <Grid.Column computer={4} mobile={8}>
                        <AdminCard
                            title={'Stjórnendur'} info={admins} icon={'key'}
                            iconText={superAdmins.length + ' ofur'} color={'yellow'} secondaryIcon={'chess queen'}
                            clickFunction={this.clickOnUsers.bind(this)}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={6} tablet={8} mobile={16}>
                        <AdminNotifications notifications={notifications} />
                    </Grid.Column>
                </Grid.Row>
            </React.Fragment>
        )
    }
}

export default AdminCardSeq;