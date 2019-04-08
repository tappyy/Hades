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
      <Header as='h5'>Case Name</Header>
      <p>{values.caseName}</p>
      <Header as='h5'>Case Description</Header>
      <p>{values.caseDescription}</p>
      <Header as='h5'>Criteria</Header>
      <ol>
        {values.criteria.map(criteria => {
          if (criteria.rule === 'keyword') {
            return <li>Body content contains {criteria.term}</li>
          }
          else if (criteria.rule === 'tags') {
            return <Fragment>
              {criteria.tags.map(tag => <p>{tag}</p>)}
            </Fragment>
          }

        })}
      </ol>

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