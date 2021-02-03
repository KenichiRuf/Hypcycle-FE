import React from 'react';
import './App.css';
import Home from './views/Home';
import Registration from './views/Registration';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Goals from './views/Goals';
import Ideas from './views/Ideas';
import Experiments from './views/Experiments';
import Playbooks from './views/Playbooks';
import Users from './views/Users';
import { HashRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PlaybookView from './views/PlaybookView';
import ResetPassword from './views/ResetPassword';
import axios from 'axios';

function App() {

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
  axios.defaults.baseURL = process.env.REACT_APP_DOMAIN
  
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/goals" component={Goals} />
      <PrivateRoute exact path="/ideas" component={Ideas} />
      <PrivateRoute exact path="/experiments" component={Experiments} />
      <PrivateRoute exact path="/playbooks" component={Playbooks} />
      <PrivateRoute exact path="/users" component={Users} />
      <PrivateRoute exact path="/playbooks/:id" render={props => <PlaybookView {...props}/>} />
      <Route path="/reset-password/:email/:userId/:password" component={ResetPassword}/>
    </Router>
  );
}

export default App;
