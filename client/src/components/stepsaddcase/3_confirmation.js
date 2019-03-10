import React, { Fragment } from 'react'
import { Header, Button, Icon, Grid } from 'semantic-ui-react'
import styled from '@emotion/styled'

const StyledButton = styled(Button)`
margin-top: 40px !important;
`

const CaseConfirmation = ({ prevStep, submitCase, values }) => {
  return (
    <Fragment>
      <Header as='h3'>Case Confirmation</Header>
      <Grid>
        <Grid.Row centered>
          <StyledButton
            size='large'
            icon
            labelPosition='left'
            onClick={prevStep}>
            Back
                <Icon name='left arrow' />
          </StyledButton>
          <StyledButton
            size='large'
            positive
            icon
            labelPosition='right'
            onClick={submitCase}>
            Confirm
              <Icon name='check' />
          </StyledButton>
        </Grid.Row>
      </Grid>
    </Fragment>

  )
}

export default CaseConfirmation