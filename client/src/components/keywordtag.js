import React from 'react'
import styled from '@emotion/styled'


const StyledTag = styled.div`
color: #1890ff;
background: #e6f7ff;
border-color: #91d5ff;
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