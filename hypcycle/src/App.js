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
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
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
    </Router>
  );
}

export default App;
