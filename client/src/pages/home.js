import React, { Component } from 'react'
import TagsCloud from '../components/cards/tagscloud'
import TotalsCard from '../components/cards/totalscard'
import HitsCard from '../components/cards/hitscard'
import TagsCountGraph from '../components/cards/tagscountgraph'
import HitsPerPageGraph from '../components/cards/hitsperpagegraph'
import styled from '@emotion/styled'
import axios from 'axios'
import { connect } from 'react-redux'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  height: 100%;
  width: 100%;
`

const TagsCountGraphWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
`

const TotalsWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
`

const HitsCounterWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`

const TagsCloudWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
`

const HitsPerPageWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
`


class Home extends Component {

  state = {
    tagsData: [],
    graphData: [],
    total: 0,
    hits: 0
  }

  componentDidMount() {
    this.getTagData()
    this.getGraphData()
    this.getTotals()
    this.getHitData()
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

  getHitData = () => {
    const { id: userId } = this.props.auth.user
    axios.get(process.env.REACT_APP_API_URL + `/stats/hits/${userId}`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { hits } = data
          this.setState({ hits: hits })
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
          const { graphData } = data
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
          const { total } = data
          this.setState({ total: total })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { tagsData, total, hits, graphData } = this.state
    return (
      <Wrapper>
        <TotalsWrapper>
          <TotalsCard total={total} />
        </TotalsWrapper>
        <HitsCounterWrapper>
          <HitsCard hits={hits} />
        </HitsCounterWrapper>
        <TagsCloudWrapper>
          <TagsCloud tagsData={tagsData} total={total} />
        </TagsCloudWrapper>
        <TagsCountGraphWrapper>
          <TagsCountGraph data={graphData} />
        </TagsCountGraphWrapper>
        <HitsPerPageWrapper>
          <HitsPerPageGraph data={[{ name: 'Total Pages', value: total }, { name: 'Total Hits', value: hits }]} />
        </HitsPerPageWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
)

export default connect(mapStateToProps)(Home);