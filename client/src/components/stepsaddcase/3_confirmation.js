import React, { Fragment } from 'react'
import { Header, Button, Icon, Grid } from 'semantic-ui-react'
import styled from '@emotion/styled'

const StyledButton = styled(Button)`
margin-top: 40px !important;
`

const Inline = styled.p`
  display: inline-block;
`

const InlineBold = styled.p`
  display: inline-block;
  font-weight: bold;
  &::after {
    content: ", ";
    white-space: pre;
  }
  &:last-child::after {
    content: "";
  }
`

const CaseConfirmation = ({ prevStep, submitCase, values }) => {

  const keywordCriteria = values.criteria.filter(criteria => criteria.rule === 'keyword').map(criteria => criteria.term)
  const [tagCriteria] = values.criteria.filter(criteria => criteria.rule === 'tags').map(criteria => criteria.tags.map(tag => tag))

  return (
    <Fragment>
      <Header as='h3'>Case Confirmation</Header>
      Confirm the details of the case below.
      <Grid divided='vertically' style={{ marginTop: '48px' }}>
        <Grid.Row>
          <Grid.Column textAlign='right' width={4}>
            <Header as='h4'>Case Name</Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <p>{values.caseName}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign='right' width={4}>
            <Header as='h4'>Case Description</Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <p>{values.caseDescription}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign='right' width={4}>
            <Header as='h4'>Criteria</Header>
          </Grid.Column>
          <Grid.Column width={12}>
            {keywordCriteria &&
              <div>
                <Inline>Content body contains:&nbsp;</Inline>
                {keywordCriteria.map(keyword => <InlineBold>{keyword}</InlineBold>)}
              </div>
            }
            {tagCriteria &&
              <div>
                <Inline>Content tagged with:&nbsp;</Inline>
                {tagCriteria.map(tag => <InlineBold>{tag}</InlineBold>)}
              </div>
            }
          </Grid.Column>
        </Grid.Row>

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