import React from 'react'
import { Form, Header, Button, Icon, Grid } from 'semantic-ui-react'
import styled from '@emotion/styled'

const StyledButton = styled(Button)`
margin-top: 40px !important;
`

const CaseDetails = ({ nextStep, handleChange, values }) => {
  return (
    <Form>
      <Header as='h3'>Case Details</Header>
      <Form.Input
        label='Case Name'
        placeholder='Case Name'
        name='caseName'
        onChange={handleChange}
        value={values.caseName}
        required />
      <Form.TextArea
        label='Description'
        placeholder='Description'
        name='caseDescription'
        onChange={handleChange}
        value={values.caseDescription} />

      <Grid>
        <Grid.Row centered>
          <StyledButton
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
    </Form>
  )
}

export default CaseDetails