import React from 'react'
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
  }
  p {
    color: #707070;
    font-size: 20px;
    font-weight: lighter;
  }
`

const Totals = ({ total }) => (
  <ContentCard fullHeight>
    <Wrapper>
      <DashboardHeader
        title='Total Scanned Pages'
        icon='list ol'
        color='#eb2f96'
        background='#fff0f6'
      />
      <TotalsContainer>
        <h1>{total}</h1>
        <p>Scanned pages</p>
      </TotalsContainer>
    </Wrapper>
  </ContentCard>

)

export default Totals;
