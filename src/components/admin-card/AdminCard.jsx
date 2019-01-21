import React from 'react';
import { Card, Icon, Grid } from 'semantic-ui-react';
import './AdminCard.css';

// TODO: Undir 1200 px X = Rusl. Laga

const AdminCard = (props) => {
    const { title, icon, iconText, color, secondaryIcon, info = [], clickFunction } = props;
    const handleClick = () => {
        clickFunction(info);
    }
    return (
        <Card className='admin-cards' onClick={handleClick}>
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
                    {/* <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' /> */}

                </Grid>
            </Card.Content>
            <Card.Content extra>
                <Icon name={secondaryIcon} />
                {iconText}
            </Card.Content>
        </Card>
    )
}


export default AdminCard;