import React, { Component } from 'react'
import TagsCloud from '../components/cards/tagscard'
import TotalsCard from '../components/cards/totalscard'
import HitsCard from '../components/cards/hitscard'
import styled from '@emotion/styled'
import axios from 'axios'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  height: 100%;
  width: 100%;
`

const ConsoleWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
`

const TotalsWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
`

const CloudWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`

const TagsWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
`


class Home extends Component {

  state = {
    tagsData: [],
    graphData: {},
    total: 0,
  }

  componentDidMount() {
    this.getTagData()
    this.getGraphData()
    this.getTotals()
  }

  getTagData = () => {
    axios.get(process.env.REACT_APP_API_URL + `/stats/tags`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ tagsData: response.data, isLoading: false })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  getGraphData = () => {
    axios.get(process.env.REACT_APP_API_URL + `/stats/taggraph`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { graphData, total } = data
          this.setState({ graphData: graphData })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  getTotals = () => {
    axios.get(process.env.REACT_APP_API_URL + `/stats/totalpages`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          console.log(data)
          const { total } = data
          this.setState({ total: total })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { tagsData, total } = this.state
    return (
      <Wrapper>
        <TotalsWrapper>
          <TotalsCard total={total} />
        </TotalsWrapper>
        <CloudWrapper>
          <HitsCard hits={300} />
        </CloudWrapper>
        <TagsWrapper>
          <TagsCloud tagsData={tagsData} />
        </TagsWrapper>
        <ConsoleWrapper>
          <HitsCard hits={300} />
        </ConsoleWrapper>
      </Wrapper>
    )
  }
}

export default Home;