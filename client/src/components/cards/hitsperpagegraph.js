import React from 'react'
import ContentCard from '../layouts/contentcard'
import styled from '@emotion/styled'
import DashboardHeader from '../dashboardcardheader'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const COLORS = ['#FFBB28', '#FF8042'];

const HitsPerPageGraph = ({ data }) => (
  <ContentCard fullHeight>
    <Wrapper>
      <DashboardHeader
        title='Average Hits Per Page Distribution'
        icon='pie graph'
        color='#2f54eb'
        background='#f0f5ff'
      />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie dataKey='value' data={data} cx={200} cy={200} label >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
          <Legend iconType='circle' />
        </PieChart>
      </ResponsiveContainer>


    </Wrapper>
  </ContentCard>

)

export default HitsPerPageGraph;
