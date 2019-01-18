import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css'
import Navbar from './components/navigation/navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import About from './pages/about'

class App extends Component {
  render() {


    return (
      <Router>
        <Fragment>
          <Switch>
            <Navbar />
            <Route exact path="/feed" component={Dashboard} />
            <Route path="/keywords" component={About} />
            <Route path="/alerts" component={About} />
            <Route path="/analysis" component={About} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
