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
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const HitsPerPageGraph = ({ data }) => (
  <ContentCard fullHeight>
    <Wrapper>
      <DashboardHeader
        title='Average Hits Per Page Distribution'
        icon='pie graph'
        color='#722ed1'
        background='#f9f0ff'
      />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey='value'
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
          >
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
