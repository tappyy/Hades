import React from 'react'
import { Grid, Input, Dropdown, Button, Icon } from 'semantic-ui-react'
import styled from '@emotion/styled'

const RuleNo = styled.p`
  font-weight: 700;
`

const options = [
  {
    key: 1,
    value: 'keyword',
    text: 'Body Content'
  },
  {
    key: 2,
    value: 'tags',
    text: 'Tags'
  }
]



const CriteriaRow = ({ count, criteria, handleChange, handleDropdownChange, removeCriteria }) => {
  function preHandleDropdownChange(e, result) {
    handleDropdownChange(result.value, criteria.id)
  }
  return (
    <Grid.Row verticalAlign='middle'>
      <Grid.Column width={1} textAlign='left'><RuleNo>{count}</RuleNo></Grid.Column>
      <Grid.Column width={3} textAlign='center'>
        <Dropdown
          fluid
          selection
          options={options}
          defaultValue={criteria.rule}
          onChange={preHandleDropdownChange}
        />
      </Grid.Column>
      <Grid.Column width={2} textAlign='center'>contains</Grid.Column>
      <Grid.Column width={8}>
        {criteria.rule === 'keyword' &&
          <Input fluid placeholder='Keyword' onChange={(e) => handleChange(e, criteria.id)} />
        }
        {criteria.rule === 'tags' &&
          <Dropdown multiple fluid selection options={options} />
        }
      </Grid.Column>
      <Grid.Column width={1}>
        {count > 1 &&
          <Button negative icon onClick={() => removeCriteria(criteria.id)}>
            <Icon name='delete' />
          </Button>
        }
      </Grid.Column>
    </Grid.Row>
  )
}

export default CriteriaRow