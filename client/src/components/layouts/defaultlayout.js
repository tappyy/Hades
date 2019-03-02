import React from 'react';
import { Route } from 'react-router-dom'
import NavBar from '../navigation/navbar';
import ContentContainer from '../../components/layouts/contentcontainer'
import styled from '@emotion/styled';

const DefaultLayout = ({ component: Component, ...rest }) => {
  const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `
  return (
    <Route {...rest} render={matchProps => (
      <AppContainer>
        <NavBar {...matchProps} />
        <ContentContainer>
          <Component {...matchProps} />
        </ContentContainer>
      </AppContainer>
    )} />
  )
};

export default DefaultLayout;