import React from 'react'
import moment from 'moment'
import { Feed, Card } from 'semantic-ui-react'

const Notifications = (props) => {
  const { notifications } = props
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Tilkynningar</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>

          {notifications && notifications.map(item => {
            return (
              <Feed.Event key={item.id}>
                <Feed.Label image='/jenny.jpg' />
                <Feed.Content>
                  <Feed.Date content={moment(item.time.toDate()).fromNow()} />
                  <Feed.Summary>
                    {item.user} stofnaði aðgang
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            )
          })}
        </Feed>
      </Card.Content>
    </Card>
  )
}

export default Notifications
