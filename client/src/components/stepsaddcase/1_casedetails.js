import React from 'react'
import { Form, Header } from 'semantic-ui-react'
import styled from '@emotion/styled'



const CaseDetails = ({ handleChange, values }) => {
  return (
    <Form>
      <Header as='h3'>Case Details</Header>
      <Form.Input label='Case Name' placeholder='Case Name' name='caseName' onChange={handleChange} value={values.caseName} />
      <Form.TextArea label='Description' placeholder='Description' />
    </Form>
  )
}

export default CaseDetails