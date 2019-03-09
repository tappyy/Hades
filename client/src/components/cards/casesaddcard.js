import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { Button, Grid, Icon, Transition, Container } from 'semantic-ui-react'
import styled from '@emotion/styled'
import PageHeader from '../pageheader';
import { colors } from '../../common/styles'
import CaseDetails from '../stepsaddcase/1_casedetails'
import Criteria from '../stepsaddcase/2_criteria'

const StyledButton = styled(Button)`
margin-top: 40px !important;
`

class CasesAddCard extends Component {

  state = {
    step: 1,
    isLoading: false,
    caseName: '',
    criteria: [
      {
        id: 1,
        rule: 'keyword',
        term: '',
        tags: []
      },
      {
        id: 2,
        rule: 'tags',
        term: '',
        tags: []
      }
    ]
  }

  submitCase(e) {
    e.preventDefault()
    console.log('added case!')
  }

  addNewCriteria = () => {
    const newCriteria = {
      id: this.state.criteria.length + 1,
      rule: 'keyword',
      term: '',
      tags: []
    }

    this.setState({ criteria: [...this.state.criteria, newCriteria] })
  }

  removeCriteria = (id) => {
    this.setState({ criteria: this.state.criteria.filter(criteria => criteria.id != id) })
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCriteriaInputChange = (e, id) => {
    const { value } = e.target
    const criteria = [...this.state.criteria]
    const index = criteria.findIndex(item => item.id === id)
    criteria[index].term = value
    this.setState({ criteria: criteria })
  }

  handleCriteriaDropdownChange = (value, id) => {
    const criteria = [...this.state.criteria]
    const index = criteria.findIndex(item => item.id === id)
    criteria[index].rule = value
    this.setState({ criteria: criteria })
  }

  render() {
    const { step, caseName, caseDesc, criteria } = this.state
    var component = null
    switch (step) {
      case 1: component =
        <CaseDetails
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={{ caseName, caseDesc }}
        />
        break
      case 2: component =
        <Criteria
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleCriteriaInputChange}
          handleDropdownChange={this.handleCriteriaDropdownChange}
          addNewCriteria={this.addNewCriteria}
          removeCriteria={this.removeCriteria}
          values={{ criteria }}
        />
        break
    }

    return (
      <ContentCard fullHeight>
        <PageHeader
          title='Add New Case'
          subtitle='Configure new content monitoring case'
          iconName='add'
          iconColor={colors.content.positive}
        />
        <Container>
          {component}
        </Container>
        <Grid>
          <Grid.Row centered>
            {step > 1 &&
              <StyledButton
                size='large'
                icon
                labelPosition='left'
                onClick={this.prevStep}>
                Back
                <Icon name='left arrow' />
              </StyledButton>
            }
            <StyledButton
              size='large'
              positive
              icon
              labelPosition='right'
              onClick={this.nextStep}>
              Next
              <Icon name='right arrow' />
            </StyledButton>

          </Grid.Row>
        </Grid>
      </ContentCard>
    )
  }
}

export default CasesAddCard
