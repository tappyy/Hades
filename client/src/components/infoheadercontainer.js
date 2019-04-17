import React from 'react'
import styled from '@emotion/styled'

const StyledDiv = styled.div`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
`

const InfoHeaderContainer = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default InfoHeaderContainer