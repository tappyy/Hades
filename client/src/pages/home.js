import React, { Component } from 'react'
import TagsCloud from '../components/cards/tagscard'
import { Grid } from 'semantic-ui-react'
import styled from '@emotion/styled'

const FullGrid = styled(Grid)`
  height: 100%;
`
const QuarterRow = styled(Grid.Row)`
  height: 50%;
`

const QuarterColumn = styled(Grid.Column)`
  height: 100%;
`

class Home extends Component {



  render() {
    return (
      <FullGrid>
        <QuarterRow>
          <QuarterColumn width={8}>
            <TagsCloud />
          </QuarterColumn>
          <QuarterColumn width={8}>
            <TagsCloud />
          </QuarterColumn>
        </QuarterRow>
        <QuarterRow>
          <QuarterColumn width={8}>
            <TagsCloud />
          </QuarterColumn>
          <QuarterColumn width={8}>
            <TagsCloud />
          </QuarterColumn>
        </QuarterRow>
      </FullGrid>
    )
  }
}

export default Home;