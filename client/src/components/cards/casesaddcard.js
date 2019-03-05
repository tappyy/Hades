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
    animation: 'fade left',
    animDuration: 500,
    step: 1,
    isLoading: false,
    caseName: ''
  }

  submitCase(e) {
    e.preventDefault()
    console.log('added case!')

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
    const { step, caseName, caseDesc } = this.state
    const values = { caseName, caseDesc }
    var component = null
    switch (step) {
      case 1: component =
        <CaseDetails
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
        />
        break
      case 2: component =
        <Criteria
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
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
