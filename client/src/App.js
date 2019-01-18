import React, { Component } from 'react';
import 'antd/dist/antd.css'
import Navbar from './components/navigation/navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Feed from './pages/feed'
import About from './pages/about'

class App extends Component {
  render() {


    return (
      <Router>
        <Switch>
          <Navbar />
          <Route path="/feed" component={Feed} />
          <Route path="/keywords" component={About} />
          <Route path="/alerts" component={About} />
          <Route path="/analysis" component={About} />
        </Switch>
      </Router>
    );
  }
}

export default App;
