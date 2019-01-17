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
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/about" component={About} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
