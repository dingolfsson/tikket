import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Loader, Dimmer, Grid } from 'semantic-ui-react';
import AdminCardSeq from '../../components/admin-card-seq/AdminCardSeq';
import TicketList from '../../components/ticket-list/TicketList';
import UserList from '../../components/user-list/UserList';

class Admin extends Component {

    componentWillReceiveProps(nextProps) {
        const { showTicketList, list, cardClicked } = nextProps;
        this.setState({ showTicketList, list, cardClicked })
    }

    render() {
        const { notifications, tickets, users } = this.props;

        if (tickets === undefined || users === undefined) {
            return (
                <Dimmer active inverted>
                    <Loader size='massive' inline='centered'>Sæki gögn</Loader>
                </Dimmer>
            )
        }

        const priority = tickets.filter(item => item.priority && !item.solved)
        const unsolved = tickets.filter(item => !item.solved)
        const admins = users.filter(item => item.admin)
        const superAdmins = users.filter(item => item.superAdmin)
        const { cardClicked, showTicketList, list } = this.state;
        // Ugly implementation using (cardClicked), because not able to put state.firestore.tickets as init value
        let displayedList;
        if (!cardClicked) {
            displayedList = (<TicketList tickets={tickets} />);
        } else {
            displayedList = showTicketList ? (<TicketList tickets={list} />) : (<UserList users={list} />)
        }
        return (
            <Container style={{ marginTop: '8em' }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            {displayedList}
                        </Grid.Column>
                    </Grid.Row>
                    <AdminCardSeq
                        {...this.props}
                        priority={priority} notifications={notifications}
                        unsolved={unsolved} admins={admins}
                        superAdmins={superAdmins} />
                </Grid>
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.firestore.ordered.tickets,
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        admin: state.firebase.profile.admin,
        list: state.admin.list,
        showTicketList: state.admin.showTicketList,
        cardClicked: state.admin.cardClicked,
    }
}

export default compose(
    firestoreConnect([
        { collection: 'tickets', orderBy: ['createdAt', 'desc'] },
        { collection: 'users' },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ]),
    connect(mapStateToProps),
)(Admin)
