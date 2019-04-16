import React, { Fragment } from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'
import styled from '@emotion/styled'

const HeaderSection = styled.div`
float: left;
`
const ColouredIcon = styled(Icon)`
color: ${props =>
    props.customcolor ? props.customcolor : 'black'};
`

const Container = styled.div`
margin-bottom: 60px;
`

const ViewCaseHeader = ({ title, subtitle, iconColor, buttonAction }) => {
  return (
    <Container>
      <HeaderSection>
        <Header as='h2'>
          <ColouredIcon customcolor={iconColor} name='briefcase' />
          <Header.Content>
            {title}
            <Header.Subheader>{subtitle}</Header.Subheader>
          </Header.Content>
        </Header>
      </HeaderSection>
      {buttonAction &&
        <Button onClick={buttonAction} floated='right' icon labelPosition='left'>
          <Icon name='setting' />
          Options
        </Button>
      }
      <div style={{ clear: 'both' }}></div>
    </Container>
  )
}


export default ViewCaseHeader