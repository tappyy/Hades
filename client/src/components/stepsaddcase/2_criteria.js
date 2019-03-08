import React, { Fragment } from 'react'
import { Header, Grid, Button } from 'semantic-ui-react'
import styled from '@emotion/styled'
import CriteriaRow from '../criteriaoptionrow'

const Criteria = ({ values, addNewCriteria }) => {

  const rows = values.criteria.map((criteria, index) => <CriteriaRow key={criteria.id} count={index + 1} criteria={criteria} />)

  return (
    <Fragment>
      <Header as='h3'>Matching Criteria</Header>
      <Grid divided='vertically'>
        {rows}
      </Grid>
      <Button onClick={addNewCriteria}>Add</Button>
    </Fragment>
  )
}

export default Criteria