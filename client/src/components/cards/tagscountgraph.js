import React from 'react'
import ContentCard from '../layouts/contentcard'
import styled from '@emotion/styled'
import DashboardHeader from '../dashboardcardheader'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TagsCountGraph = ({ data }) => (
  <ContentCard fullHeight>
    <Wrapper>
      <DashboardHeader
        title='Hits Per Tag'
        icon='line graph'
        color='#2f54eb'
        background='#f0f5ff'
      />
      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
        // margin={{
        //   top: 5, right: 30, left: 20, bottom: 5,
        // }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" />
          <YAxis />
          <Tooltip />
          <Legend iconType='circle' />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

    </Wrapper>
  </ContentCard>

)

export default TagsCountGraph;
