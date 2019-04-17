import React from 'react'
import NavItem from './navItem'
import styled from '@emotion/styled'
import { IconNames } from "@blueprintjs/icons";
import { colors } from '../../common/styles'
import NavUser from './navuser'

const Navbar = props => {
  const NavContainer = styled.nav`
    display: flex;
    padding-left: 48px;
    padding-right: 48px;
    border-bottom: 1px solid ${colors.content.border};
  `

  const NavLinks = styled.ul`
    list-style: none;
    margin-bottom: 0;
    margin-right: auto;
    padding: 0;
    display: flex;
    margin-top: 0;

    & li:last-child {
      margin-right: 0;
    }
  `

  return (
    <NavContainer>
      <NavLinks role='navigation'>
        <NavItem location={props.location} icon={IconNames.HOME} color={colors.nav.home} to='/home' label='Home' />
        <NavItem location={props.location} icon={IconNames.KEY} color={colors.nav.search} to='/search' label='Search' />
        <NavItem location={props.location} icon={IconNames.BRIEFCASE} color={colors.nav.cases} to='/cases' label='Cases' />
      </NavLinks>

      <NavUser />

    </NavContainer>
  )
}

export default Navbar;