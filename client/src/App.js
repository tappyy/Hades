import React, { Component, Fragment } from 'react';
import styled from 'styled-components'
import { Button, Spin } from 'antd';
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    const Header = styled.h1`
    font-weight: bolder
  `

    return (
      <Fragment>
        <Header>{`I'm a pretty little React app :)`}</Header>
        <Button type="dashed">Dashed</Button>
        <Spin />
      </Fragment>
    );
  }
}

export default App;
