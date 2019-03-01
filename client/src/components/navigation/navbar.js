import React from 'react'
import NavItem from './navItem'
import styled from '@emotion/styled'
import { IconNames } from "@blueprintjs/icons";
import { colors } from '../../common/styles'

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
        <NavItem location={props.location} icon={IconNames.HOME} color={colors.nav.feed} to='/home' label='Home' />
        <NavItem location={props.location} icon={IconNames.KEY} color={colors.nav.keywords} to='/search' label='Search' />
        <NavItem location={props.location} icon={IconNames.WARNING_SIGN} color={colors.nav.alerts} to='/alerts' label='Alerts' />
        <NavItem location={props.location} icon={IconNames.GRAPH} color={colors.nav.analysis} to='/analysis' label='Analysis' />
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar
