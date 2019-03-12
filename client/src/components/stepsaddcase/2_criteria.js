import React, { Fragment } from 'react'
import { Header, Grid, Button, Icon } from 'semantic-ui-react'
import styled from '@emotion/styled'
import CriteriaRow from '../criteriaoptionrow'

const StyledButton = styled(Button)`
margin-top: 40px !important;
`

const Criteria = ({ prevStep, nextStep, values, addNewCriteria, removeCriteria, handleChange, handleDropdownChange, handleTagSelectChange }) => {

  const rows = values.criteria.map((criteria, index) =>
    <CriteriaRow
      key={criteria.id}
      count={index + 1}
      criteria={criteria}
      handleChange={handleChange}
      handleDropdownChange={handleDropdownChange}
      handleTagSelectChange={handleTagSelectChange}
      removeCriteria={removeCriteria} />
  )

  return (
    <Fragment>
      <Header as='h3'>Matching Criteria for {values.caseName}</Header>
      <Grid divided='vertically'>
        {rows}
        <Button onClick={addNewCriteria}>Add Rule</Button>
      </Grid>
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
            disabled={!values.criteria[0].term && !values.criteria[0].tags.length}
            size='large'
            positive
            icon
            labelPosition='right'
            onClick={nextStep}>
            Next
              <Icon name='right arrow' />
          </StyledButton>
        </Grid.Row>
      </Grid>
    </Fragment>
  )
}

export default Criteria