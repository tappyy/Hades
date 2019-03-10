import React from 'react'
import { Grid, Input, Dropdown, Button, Icon } from 'semantic-ui-react'
import styled from '@emotion/styled'
import { tagDropdownOptions, ruleDropdownOptions } from '../utils/constants'

const RuleNo = styled.p`
  font-weight: 700;
`

const CriteriaRow = ({ count, criteria, handleChange, handleDropdownChange, handleTagSelectChange, removeCriteria }) => {

  function preHandleDropdownChange(e, result) {
    handleDropdownChange(result.value, criteria.id)
  }

  function preHandleTagSelect(e, result) {
    handleTagSelectChange(result.value, criteria.id)
  }

  return (
    <Grid.Row verticalAlign='middle'>
      <Grid.Column width={1} textAlign='left'><RuleNo>{count}</RuleNo></Grid.Column>
      <Grid.Column width={3} textAlign='center'>
        <Dropdown
          fluid
          selection
          options={ruleDropdownOptions}
          defaultValue={criteria.rule}
          onChange={preHandleDropdownChange}
        />
      </Grid.Column>
      <Grid.Column width={2} textAlign='center'>contains</Grid.Column>
      <Grid.Column width={8}>
        {criteria.rule === 'keyword' &&
          <Input
            fluid
            placeholder='Keyword'
            value={criteria.term}
            onChange={(e) => handleChange(e, criteria.id)} />
        }
        {criteria.rule === 'tags' &&
          <Dropdown
            multiple
            fluid
            selection
            options={tagDropdownOptions}
            onChange={preHandleTagSelect}
          />
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