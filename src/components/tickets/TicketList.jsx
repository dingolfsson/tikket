import React, { Component } from 'react'
import { withRouter } from "react-router";
import _ from 'lodash'
import { Table, Container, Loader, Icon, Segment, Button } from 'semantic-ui-react'
import moment from 'moment';
import './TicketList.css'
import { Link } from 'react-router-dom'
// TODO: Pagination for tables
// TODO: Sortable by date
// TODO: Icons
// TODO: Clickable row

class TicketList extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
  }

  componentDidMount() {
    this.setState({
      data: this.props.tickets
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
        <Table color="orange" sortable compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'authorFirstName' ? direction : null}
                onClick={this.handleSort('authorFirstName')}
              >
                Nafn
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'selectedOption' ? direction : null}
                onClick={this.handleSort('selectedOption')}
              >

              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'title' ? direction : null}
                onClick={this.handleSort('title')}
              >
                Lýsing
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'phone' ? direction : null}
                onClick={this.handleSort('phone')}
              >
                Sími
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'created' ? direction : null}
                onClick={this.handleSort('created')}
              >
                Stofnað
            </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(ticket => {
              return (
                <Table.Row key={ticket.id} positive={ticket.solved} onClick={() => this.handleClick(ticket.id)}>
                  <Table.Cell>{ticket.authorName}</Table.Cell>
                  <Table.Cell>
                    <Icon name={ticket.selectedOption} />
                    {ticket.priority ? <Icon name={'exclamation'} /> : null}
                  </Table.Cell>
                  <Table.Cell>{ticket.title}</Table.Cell>
                  <Table.Cell>{ticket.phone}</Table.Cell>
                  <Table.Cell textAlign='right'>{moment(ticket.createdAt.toDate()).locale('is').calendar()}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default withRouter(TicketList);