import React from 'react'
import styled from '@emotion/styled'


const StyledTag = styled.div`
color: #fa541c;
background: #fff2e8;
border-color: #ffbb96;
height: 22px;
margin-right: 8px;
margin-bottom: 8px;
padding: 0 7px;
font-size: 12px;
border-radius: 4px;
display: inline-block;
border: 1px solid;
cursor: pointer;
`

const Tag = ({ tagName }) => (
  <span><StyledTag>{tagName}</StyledTag></span>
)

export default Tag