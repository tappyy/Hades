import React from 'react';
import NavBar from '../navigation/navbar';
import ContentContainer from '../../components/layouts/contentcontainer'
import styled from '@emotion/styled';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const DefaultLayout = ({ component: Component, auth, ...rest }) => {
  const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `
  return (
    <Route {...rest} render={matchProps =>
      auth.isAuthenticated ?
        (
          <AppContainer>
            <NavBar {...matchProps} />
            <ContentContainer>
              <Component {...matchProps} />
            </ContentContainer>
          </AppContainer>
        )
        :
        (
          <Redirect to="/login" />
        )
    } />
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DefaultLayout);