import React, { Fragment } from 'react'
import { Header, Grid, Button } from 'semantic-ui-react'
import styled from '@emotion/styled'
import CriteriaRow from '../criteriaoptionrow'


const Criteria = ({ values, addNewCriteria, removeCriteria, handleChange, handleDropdownChange, handleTagSelectChange }) => {

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
      <Header as='h3'>Matching Criteria</Header>
      <Grid divided='vertically'>
        {rows}
        <Button onClick={addNewCriteria}>Add</Button>
      </Grid>
    </Fragment>
  )
}

export default Criteria