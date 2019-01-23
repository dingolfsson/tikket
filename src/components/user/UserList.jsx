import React, { Component } from 'react'
import { withRouter } from "react-router";
import _ from 'lodash'
import { Table, Container, Loader, Icon, Button } from 'semantic-ui-react'
import moment from 'moment';
import './UserList.css'
import { Link } from 'react-router-dom'
// TODO: Pagination for tables
// TODO: Sortable by date
// DONE: Icons
// DONE: Clickable row
// TODO: Default sort by date
// TODO: Hide solved

class UserList extends Component {
    state = {
        column: null,
        direction: null,
    }

    handleSort = clickedColumn => () => {
        const { column, users, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                users: _.sortBy(users, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            users: users.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleClick = (id) => {
        //this.props.history.push("/ticket/" + id);
    }

    render() {
        const { column, direction } = this.state
        const { users } = this.props;

        if (users === undefined) {
            return <Loader />
        }
        return (
            <React.Fragment>
                <Table color="orange" sortable compact fixed singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'authorFirstName' ? direction : null}
                                onClick={this.handleSort('authorFirstName')}
                            >
                                Nafn
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'email' ? direction : null}
                                onClick={this.handleSort('email')}
                            >
                                Netfang
              </Table.HeaderCell>
                            <Table.HeaderCell
                                textAlign='right'
                                sorted={column === 'phone' ? direction : null}
                                onClick={this.handleSort('phone')}
                            >
                                Sími
            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map(user => {
                            return (
                                <Table.Row key={user.id} positive={user.solved} warning={user.priority && !user.solved} onClick={() => this.handleClick(user.id)}>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell textAlign='right'>{user.phone}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </React.Fragment>
        )
    }
}

export default withRouter(UserList);