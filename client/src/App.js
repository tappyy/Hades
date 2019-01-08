import React, { Component } from 'react';
import styled from 'styled-components'

class App extends Component {
  render() {
    const Header = styled.h5`
    color: red
  `

    return (
      <Header>{`I'm a pretty little React app :)`}</Header>
    );
  }
}

export default App;
