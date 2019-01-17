import React from 'react'
import styled from 'styled-components'
import NavItem from './navItem'

const Navbar = () => {
  const Nav = styled.nav`
    
  `

  return (
    <Nav>
      <NavItem to='/' label='Dashboard' />
      <NavItem to='/about' label='About' />
    </Nav>
  )
}

export default Navbar
