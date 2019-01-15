import React from 'react'
import { Card, Icon, Grid } from 'semantic-ui-react'
import './AdminCards.css'

// AdminCards: Container
// params props
// @return card
const AdminCards = (props) => {
  // Props: From Admin component
  const { title, info, icon, iconText, color, secondaryIcon } = props

  return (
    <Card className='admin-cards'>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Icon corner size='big' name={icon} color={color} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Card.Header textAlign='right'>{title}</Card.Header>
              <Card.Description textAlign='right'>
                {info && info.length}
              </Card.Description>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        <Icon name={secondaryIcon} />
        {iconText}
      </Card.Content>
    </Card>
  )
}

export default (AdminCards)
