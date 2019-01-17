import React from 'react'
import NavItem from './navItem'
import styled from '@emotion/styled'
import { IconNames } from "@blueprintjs/icons";
import { colors } from '../../common/styles'

const Navbar = () => {
  const NavContainer = styled.nav`
    /* padding-top: 20px;
    padding-bottom: 20px; */
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

    & li:last-child {
      margin-right: 0;
    }
  `

  return (
    <NavContainer>
      <NavLinks role='navigation'>
        <NavItem icon={IconNames.HOME} iconFill={colors.nav.feed} to='/feed' label='Feed' />
        <NavItem icon={IconNames.KEY} iconFill={colors.nav.keywords} to='/keywords' label='Keywords' />
        <NavItem icon={IconNames.WARNING_SIGN} iconFill={colors.nav.alerts} to='/alerts' label='Alerts' />
        <NavItem icon={IconNames.GRAPH} iconFill={colors.nav.analysis} to='/analysis' label='Analysis' />
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar
