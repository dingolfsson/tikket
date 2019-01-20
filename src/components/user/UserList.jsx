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
    data: [],
    direction: null,
  }

  componentDidMount() {
    this.setState({
      data: this.props.users,
    })
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handleClick = (id) => {
    this.props.history.push("/ticket/" + id);
  }

  render() {
    const { column, data, direction } = this.state

    if (data === undefined) {
      return <Loader />
    }
    return (
      <Container>
        <Button.Group labeled icon color='blue' floated='right'>
          <Button as={Link} to='/ticket/new' labelPosition='left' icon='plus' content='Ný beiðni' />
        </Button.Group>
        <Table color="orange" sortable compact fixed singleLine>
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
                width={3}
                sorted={column === 'email' ? direction : null}
                onClick={this.handleSort('email')}
              >
                Netfang
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                textAlign='right'
                sorted={column === 'phone' ? direction : null}
                onClick={this.handleSort('phone')}
              >
                Sími
            </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(user => {
              return (
                <Table.Row key={user.id} positive={user.solved} warning={user.priority && !user.solved} onClick={() => this.handleClick(user.id)}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    <Icon name={user.selectedOption} />
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell textAlign='right'>{user.phone}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default withRouter(UserList);