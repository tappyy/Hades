import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Search from './pages/search'
import Cases from './pages/cases'
import CasesAdd from './pages/casesadd'
import Analysis from './pages/analysis'
import Login from './pages/login'
import DefaultLayout from './components/layouts/defaultlayout'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// check if user is logged in
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  // check expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())

    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/login" render={() => <Login />} />
              <DefaultLayout exact path="/home" component={Home} />
              <DefaultLayout exact path="/search" component={Search} />
              <DefaultLayout exact path="/cases" component={Cases} />
              <DefaultLayout path="/cases/add" component={CasesAdd} />
              <DefaultLayout path="/analysis" component={Analysis} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
