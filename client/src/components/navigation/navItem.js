import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { Icon } from "@blueprintjs/core";
import { colors } from '../../common/styles'

const topPadding = 20
const borderWidth = 2
const bottomPadding = topPadding - borderWidth
const padding = `${topPadding}px 10px ${bottomPadding}px`


const LinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${padding};
  margin-right: 36px;
  min-width: 110px;
  border-bottom: ${props => props.active ? `${borderWidth}px solid ${props.color}` : `${borderWidth}px solid transparent`};
`

const StyledLink = styled(NavLink)`
  color: ${colors.content.body};
  `

const StyledIcon = styled(Icon)`
  vertical-align: middle;
  fill: ${props => props.fill}
  `

const Label = styled.p`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 8px;
`


const navItem = props => {
  return (
    <LinkItem active={props.location.pathname.includes(props.label.toLowerCase())} color={props.color}>
      <StyledLink to={props.to}>
        <StyledIcon fill={props.color} icon={props.icon} iconSize={Icon.SIZE_STANDARD} />
        <Label>{props.label}</Label>
      </StyledLink>
    </LinkItem>
  )
}


export default navItem
