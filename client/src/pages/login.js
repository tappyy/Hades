import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import BackgroundImage from '../images/cup.jpg';
import Logo from '../images/logo.svg';



const LoginContainer = styled.div`
  flex-grow: 1;
  padding: 64px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  height:100%;
`

const FormContainer = styled.div`
margin-top: auto;
margin-bottom: auto;
.ui.form .field > label {
  color: #aaa;
  font-weight: lighter;
}
`

const InfoContainer = styled.div`
  flex-grow: 3;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 64px;
  h1 {
    color: white;
    font-weight: lighter;
  }
`

const LogoContainer = styled.div`
display: flex;
margin-bottom: 64px;
align-items: center;
img {
  width: 36px;
  margin-right: 18px;
}
h1 {
  margin: 0;
  color: #6195ff;
  font-weight: lighter;
}


`

const LogoHeader = styled.div`
h2 {
  font-weight: lighter;
}
`

const Subtitle = styled.h2`

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
      <PageContainer>
        <LoginContainer>
          <LogoHeader>
            <LogoContainer>
              <img src={Logo} />
              <h1>Hades</h1>
            </LogoContainer>
            <Subtitle>Contextual Aggregation of Dark Web Content for Use in Intelligence Services</Subtitle>
          </LogoHeader>
          <FormContainer>

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
              <Button primary type='submit'>Login</Button>
            </Form>
          </FormContainer>
        </LoginContainer>
        <InfoContainer>

        </InfoContainer>
      </PageContainer>
    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
)

export default connect(mapStateToProps, { loginUser })(withRouter(Login));