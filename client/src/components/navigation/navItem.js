import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { Icon } from "@blueprintjs/core";
import { colors } from '../../common/styles'

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  padding: 24px 10px;
  margin-right: 50px;
`

const Label = styled.p`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 8px;
`

const StyledIcon = styled(Icon)`
  vertical-align: middle;
  fill: ${props => props.fill}
  `

const StyledLink = styled(NavLink)`
color: ${colors.content.body}
`

const navItem = props => {
  console.log(props.iconFill)
  return (
    <LinkItem>
      <StyledLink activeStyle={{ fontWeight: 500 }} to={props.to}>
        <StyledIcon fill={props.iconFill} icon={props.icon} iconSize={Icon.SIZE_STANDARD} />
        <Label>{props.label}</Label>
      </StyledLink>
    </LinkItem>
  )
}


export default navItem
