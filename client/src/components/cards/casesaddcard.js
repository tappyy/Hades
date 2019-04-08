import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { Button, Grid, Icon, Transition, Step, Container } from 'semantic-ui-react'
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
      criteria: [...criteria]
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

  gotoStep = (step) => {
    this.setState({ step: step })
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
          values={{ caseName, criteria }} />
        break
      case 3: component =
        <Confirmation
          prevStep={this.prevStep}
          submitCase={this.submitCase}
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
          <Grid>
            <Grid.Row centered>
              <Step.Group>
                <Step active={step === 1} onClick={() => this.gotoStep(1)}>
                  <Icon name='briefcase' />
                  <Step.Content>
                    <Step.Title>Details</Step.Title>
                    <Step.Description>Initial details for this case</Step.Description>
                  </Step.Content>
                </Step>

                <Step active={step === 2} onClick={() => this.gotoStep(2)} disabled={!caseName}>
                  <Icon name='list ul' />
                  <Step.Content>
                    <Step.Title>Criteria</Step.Title>
                    <Step.Description>Set up matching criteria for this case</Step.Description>
                  </Step.Content>
                </Step>

                <Step active={step === 3} onClick={() => this.gotoStep(3)} disabled={!criteria[0].term && !criteria[0].tags.length}>
                  <Icon name='check' />
                  <Step.Content>
                    <Step.Title>Confirm Case</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Grid.Row>
          </Grid>
          {component}
        </Container>
      </ContentCard>
    )
  }
}

export default CasesAddCard
