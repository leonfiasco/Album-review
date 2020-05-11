import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
