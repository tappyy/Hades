import React from 'react'
import styled from '@emotion/styled'
import { Icon } from 'semantic-ui-react'

const Container = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;
position: relative;
h5 {
  color: #66747c;
  font-weight: 400;
}
`

const IconWrapper = styled.div`
background-color: ${props => props.background};
height: 40px;
width: 40px;
border-radius: 20px;
position: absolute;
top: -8px;
right: 8px;
display: flex;
justify-content: center;
align-items: center;
line-height: normal;

`

const StyledIcon = styled(Icon)`
color: ${props => props.customcolor};
margin: 0 !important;
font-size: 18px;
`


const dashboard = ({ title, icon, color, background }) => (
  <Container>
    <h5>{title}</h5>
    <IconWrapper background={background}>
      <StyledIcon name={icon} customcolor={color} />
    </IconWrapper>
  </Container>

)

export default dashboard