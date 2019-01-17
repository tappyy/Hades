import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const CustomLink = styled(NavLink)`
  display: inline-block;
  margin-left: 20px;
`

const navItem = props => {
  return (
    <CustomLink to={props.to}>{props.label}</CustomLink>
  )
}


export default navItem
