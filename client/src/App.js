import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Search from './pages/search'
import Cases from './pages/cases'
import ViewCase from './pages/viewcase'
import ViewPage from './pages/viewpage'
import CasesAdd from './pages/casesadd'
import Login from './pages/login'
import DefaultLayout from './components/layouts/defaultlayout'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import ToastHandler from './components/toastHandler'
import AlertHandler from './components/alertHandler'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <AlertHandler />
            <ToastHandler />
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/login" render={() => <Login />} />
              <DefaultLayout exact path="/home" component={Home} />
              <DefaultLayout exact path="/search" component={Search} />
              <DefaultLayout exact path="/cases" component={Cases} />
              <DefaultLayout path="/cases/add" component={CasesAdd} />
              <DefaultLayout path="/cases/:id" component={ViewCase} />
              <DefaultLayout path="/pages/:id" component={ViewPage} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
