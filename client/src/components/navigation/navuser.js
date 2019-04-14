import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'
import styled from '@emotion/styled'

const NavUserContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    font-weight: bold;
    :hover {
      cursor: pointer;
    }
  }
  `

class NavUser extends Component {

  state = {
    dropdownOpen: false
  }

  toggleDropdown = (e) => {
    e.preventDefault();
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  logoutClicked = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <NavUserContainer>
        <p onClick={this.toggleDropdown}>{isAuthenticated ? (user.firstName + ' ' + user.lastName) : ''}</p>
        <Dropdown open={this.state.dropdownOpen} pointing direction='left' className='link item'>
          <Dropdown.Menu>
            {/* <Dropdown.Item><Link to='/settings'>Settings</Link></Dropdown.Item>
            <Dropdown.Item><Link to={`/profile/${user._id}`}>My Profile</Link></Dropdown.Item>
            <Dropdown.Divider /> */}
            <Dropdown.Item onClick={this.logoutClicked.bind(this)}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </NavUserContainer>


    )
  }
}

{/* <div className="user-details">
        <div className="user-name">
          <p onClick={this.toggleDropdown.bind(this)}>{isAuthenticated ? (user.first_name + ' ' + user.last_name) : ''}<span className="user-image">&nbsp;</span></p>
        </div>
        <Dropdown open={this.state.dropdownOpen} pointing direction='left' className='link item'>
          <Dropdown.Menu id="user-dropdown">
            <Dropdown.Item><Link to='/settings'>Settings</Link></Dropdown.Item>
            <Dropdown.Item><Link to={`/profile/${user._id}`}>My Profile</Link></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.logoutClicked.bind(this)}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, { logoutUser })(NavUser);