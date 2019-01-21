import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { Container, Loader, Dimmer, Button, Grid } from 'semantic-ui-react'
import TicketList from '../../components/ticket-list/TicketList';
import './Home.css'

class Home extends Component {

    render() {
        let { tickets, auth } = this.props;
        if (!tickets) {
            return (
                <Dimmer active inverted>
                    <Loader size='massive' inline='centered'>Sæki gögn</Loader>
                </Dimmer>
            );
        }
        tickets = tickets.filter(item => item.authorId === auth.uid)
        return (
            <Container text style={{ marginTop: '7em' }}>
                <Grid>
                    <Grid.Row>
                        <h2>Þínar beiðnir</h2>
                    </Grid.Row>
                    <Grid.Row>
                        <TicketList tickets={tickets} />
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const admin = (state.firebase.profile.admin)
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
)(Home)
