import React from 'react'
import ContentCard from '../layouts/contentcard'
import styled from '@emotion/styled'
import DashboardHeader from '../dashboardcardheader'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Console = ({ data }) => (
  <ContentCard fullHeight>
    <Wrapper>
      <DashboardHeader
        title='Activity Console'
        icon='code'
        color='#2f54eb'
        background='#f0f5ff'
      />

    </Wrapper>
  </ContentCard>

)

export default Console;
