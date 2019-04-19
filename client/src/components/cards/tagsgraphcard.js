import React, { Component, Fragment } from 'react'
import ContentCard from '../layouts/contentcard'
import { Header, Loader } from 'semantic-ui-react'
import axios from 'axios'
import styled from '@emotion/styled'
import { Doughnut } from 'react-chartjs-2';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
const TotalsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  h1 {
    font-size: 90px;
  }
  p {
    color: #707070;
    font-size: 24px;
    font-weight: lighter;
  }
`

class TagsGraph extends Component {

  state = {
    graphData: {},
    total: null,
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.getGraphData()
    this.interval = setInterval(() => { this.getGraphData() }, 30000);
    this.setState({ isLoading: false })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getGraphData = () => {
    axios.get(process.env.REACT_APP_API_URL + `/stats/taggraph`)
      .then(response => {
        if (response.status === 200) {
          const { data } = response
          const { graphData, total } = data
          this.setState({ graphData: graphData, total: total })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { graphData, total, isLoading } = this.state
    return (
      <ContentCard fullHeight>
        <Header as='h3'>Tags Distribution</Header>
        <Wrapper>

          <TotalsContainer>
            {total &&
              <Fragment>
                <h1>{total}</h1>
                <p>total results</p>
              </Fragment>
            }
          </TotalsContainer>
          <GraphContainer>
            <Doughnut
              options={{ maintainAspectRatio: true }}
              data={graphData} />
          </GraphContainer>
        </Wrapper>
      </ContentCard>
    )
  }
}

export default (TagsGraph);
