import React, { Component, Fragment } from 'react'
import ContentCard from '../layouts/contentcard'
import styled from '@emotion/styled'
import DashboardHeader from '../dashboardcardheader'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TotalsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  h1 {
    font-size: 70px;
    margin-bottom: 0;
    color: #52c41a;
  }
  p {
    color: #909090;
    font-size: 20px;
    font-weight: lighter;
  }
`

const Hits = ({ hits }) => (
  <ContentCard fullHeight>
    <Wrapper>
      <DashboardHeader
        title='Total Number of Hits'
        icon='target'
        color='#52c41a'
        background='#f6ffed'
      />
      <TotalsContainer>
        <h1>{hits}</h1>
        <p>Total hits</p>
      </TotalsContainer>
    </Wrapper>
  </ContentCard>

)

export default Hits;
