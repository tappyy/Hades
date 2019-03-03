import React, { Fragment } from 'react'
import { Header, Icon, Button } from 'semantic-ui-react'
import styled from '@emotion/styled'

const HeaderSection = styled.div`
float: left;
`

const PageHeader = ({ title, subtitle, iconName, buttonText, buttonAction, buttonIcon }) => {
  return (
    <Fragment>
      <HeaderSection>
        <Header as='h2'>
          <Icon name={iconName} />
          <Header.Content>
            {title}
            <Header.Subheader>{subtitle}</Header.Subheader>
          </Header.Content>
        </Header>
      </HeaderSection>
      {buttonAction &&
        <Button onClick={buttonAction} floated='right' positive icon labelPosition='left'>
          <Icon name={buttonIcon} />
          {buttonText}
        </Button>
      }
      <div style={{ clear: 'both' }}></div>
    </Fragment>
  )
}


export default PageHeader