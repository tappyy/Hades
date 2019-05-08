import React from 'react'
import styled from '@emotion/styled'

const StyledTag = styled.div`
color: #fa541c;
display: inline-block;
background: #fff2e8;
border-color: #ffbb96;
/* height: 22px; */
margin-right: 8px;
margin-bottom: 8px;
padding: 7px;
font-size: ${props =>
                props.fontSize && props.fontSize > 11 ? `${props.fontSize}px` : '11px'};
border-radius: 4px;
display: inline-block;
border: 1px solid;
cursor: pointer;
line-height: ${props =>
                props.fontSize && props.fontSize > 11 ? `${props.fontSize}px` : '11px'};
                `

const Tag = ({ tagName, fontSize }) => (
        <StyledTag fontSize={fontSize}>{tagName}</StyledTag>
)

export default Tag