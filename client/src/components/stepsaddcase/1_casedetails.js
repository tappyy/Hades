import React from 'react'
import { Form, Header } from 'semantic-ui-react'
import styled from '@emotion/styled'



const CaseDetails = ({ handleChange, values }) => {
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
    </Form>
  )
}

export default CaseDetails