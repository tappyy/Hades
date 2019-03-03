import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Search from './pages/search'
import Cases from './pages/cases'
import CasesAdd from './pages/casesadd'
import Analysis from './pages/analysis'
import DefaultLayout from './components/layouts/defaultlayout'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <DefaultLayout exact path="/home" component={Home} />
            <DefaultLayout exact path="/search" component={Search} />
            <DefaultLayout exact path="/cases" component={Cases} />
            <DefaultLayout path="/cases/add" component={CasesAdd} />
            <DefaultLayout path="/analysis" component={Analysis} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
