import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const LoginContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  width: 40%;
`

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    // redirect straight if we are already authenticated
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  submitLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state

    const userData = {
      email: email,
      password: password
    }

    this.props.loginUser(userData)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password } = this.state
    return (
      <Container>
        <h1>Hades</h1>
        <LoginContainer>
          <h3>Login</h3>
          <Form onSubmit={this.submitLogin}>
            <Form.Input
              name='email'
              label='Email'
              type='email'
              value={email}
              placeholder='Email'
              icon='user'
              iconPosition='left'
              onChange={this.handleChange}
            />
            <Form.Input
              name='password'
              label='Password'
              type='password'
              value={password}
              placeholder='Password'
              icon='lock'
              iconPosition='left'
              onChange={this.handleChange}
            />
            <Button type='submit'>Submit</Button>
          </Form>
        </LoginContainer>
      </Container>

    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
)

export default connect(mapStateToProps, { loginUser })(withRouter(Login));