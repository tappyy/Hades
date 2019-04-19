import React, { Component } from 'react'
import TagsCloud from '../components/cards/tagscard'
import TagsGraph from '../components/cards/tagsgraphcard'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  height: 100%;
  width: 100%;
`

const CloudWrapper = styled.div`
grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
`

const GraphWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
`


const Column = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
flex-basis: content;
`

class Home extends Component {

  render() {
    return (
      <Wrapper>
        <CloudWrapper>
          <TagsCloud />
        </CloudWrapper>
        <GraphWrapper>
          <TagsGraph />
        </GraphWrapper>
      </Wrapper>
    )
  }
}

export default Home;