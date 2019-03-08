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
        match: []
      },
      {
        id: 1,
        rule: 'tags',
        match: []
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
      match: ''
    }

    this.setState({ criteria: [...this.state.criteria, newCriteria] })
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
          handleChange={this.handleChange}
          addNewCriteria={this.addNewCriteria}
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
