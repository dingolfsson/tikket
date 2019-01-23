import React, { Component } from 'react'
import { withRouter } from "react-router";
import _ from 'lodash'
import { Table, Container, Loader, Icon, Button } from 'semantic-ui-react'
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom'
import './TicketList.css'

class TicketList extends Component {
    state = {
        column: null,
        tickets: this.props.tickets,
        direction: null,
        redirect: null,
    }

    componentWillReceiveProps(nextProps) {
        const { tickets } = nextProps;
        this.setState({ tickets });
    }

    handleSort = clickedColumn => () => {
        const { column, tickets, direction } = this.state
        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                tickets: _.sortBy(tickets, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }
        this.setState({
            tickets: tickets.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleClick = (id) => {
        this.setState({ redirect: `/ticket/${id}` })
    }

    render() {
        const { column, tickets, direction, redirect } = this.state
        if (redirect) {
            return (<Redirect to={redirect} />)
        }
        else if (tickets === undefined) {
            return <Loader />
        }
        return (
            <Table color="orange" sortable compact fixed singleLine selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            width={3}
                            sorted={column === 'authorFirstName' ? direction : null}
                            onClick={this.handleSort('authorFirstName')}
                        >
                            Nafn
                    </Table.HeaderCell>
                        <Table.HeaderCell
                            width={1}
                            sorted={column === 'selectedOption' ? direction : null}
                            onClick={this.handleSort('selectedOption')}
                        >

                        </Table.HeaderCell>
                        <Table.HeaderCell
                            width={5}
                            sorted={column === 'title' ? direction : null}
                            onClick={this.handleSort('title')}
                        >
                            Lýsing
                                </Table.HeaderCell>
                        <Table.HeaderCell
                            width={3}
                            textAlign='right'
                            sorted={column === 'phone' ? direction : null}
                            onClick={this.handleSort('phone')}
                        >
                            Sími
                            </Table.HeaderCell>
                        <Table.HeaderCell
                            width={3}
                            textAlign='right'
                            sorted={column === 'created' ? direction : null}
                            onClick={this.handleSort('created')}
                        >
                            Stofnað
                            </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tickets.map(ticket => {
                        return (
                            <Table.Row key={ticket.id} positive={ticket.solved} warning={ticket.priority && !ticket.solved} onClick={() => this.handleClick(ticket.id)} >
                                <Table.Cell>{ticket.name}</Table.Cell>
                                <Table.Cell>
                                    <Icon name={ticket.selectedOption} />
                                </Table.Cell>
                                <Table.Cell>{ticket.priority && !ticket.solved ? <Icon name={'attention'} /> : null}{ticket.title}</Table.Cell>
                                <Table.Cell textAlign='right'>{ticket.phone}</Table.Cell>
                                <Table.Cell textAlign='right'>{moment(ticket.createdAt.toDate()).locale('is').calendar()}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }
}

export default withRouter(TicketList);