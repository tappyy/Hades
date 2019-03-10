import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { Button, Grid, Icon, Transition, Container } from 'semantic-ui-react'
import styled from '@emotion/styled'
import PageHeader from '../pageheader';
import { colors } from '../../common/styles'
import CaseDetails from '../stepsaddcase/1_casedetails'
import Criteria from '../stepsaddcase/2_criteria'
import Confirmation from '../stepsaddcase/3_confirmation'

const StyledButton = styled(Button)`
margin-top: 40px !important;
`

class CasesAddCard extends Component {

  state = {
    step: 1,
    isLoading: false,
    caseName: '',
    caseDescription: '',
    criteria: [
      {
        id: 1,
        rule: 'keyword',
        term: '',
        tags: []
      },
    ]
  }

  submitCase = (e) => {
    e.preventDefault()
    const { caseName, caseDescription, criteria } = this.state
    const caseDetails = {
      name: caseName,
      description: caseDescription,
      criteria: criteria
    }

    console.log('added case:', caseDetails)
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

  handleTagSelectChange = (result, id) => {
    const criteria = [...this.state.criteria]
    const index = criteria.findIndex(item => item.id === id)
    criteria[index].tags = result
    this.setState({ criteria: criteria })
  }

  render() {
    const { step, caseName, caseDescription, criteria } = this.state
    var component = null
    switch (step) {
      case 1: component =
        <CaseDetails
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={{ caseName, caseDescription }} />
        break
      case 2: component =
        <Criteria
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleCriteriaInputChange}
          handleDropdownChange={this.handleCriteriaDropdownChange}
          handleTagSelectChange={this.handleTagSelectChange}
          addNewCriteria={this.addNewCriteria}
          removeCriteria={this.removeCriteria}
          values={{ criteria }} />
        break
      case 3: component =
        <Confirmation
          values={{ caseName, caseDescription, criteria }} />
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
            {step < 3 &&
              <StyledButton
                size='large'
                positive
                icon
                labelPosition='right'
                onClick={this.nextStep}>
                Next
              <Icon name='right arrow' />
              </StyledButton>
            }
            {step === 3 &&
              <StyledButton
                size='large'
                positive
                icon
                labelPosition='right'
                onClick={this.submitCase}>
                Confirm
              <Icon name='check' />
              </StyledButton>
            }

          </Grid.Row>
        </Grid>
      </ContentCard>
    )
  }
}

export default CasesAddCard
