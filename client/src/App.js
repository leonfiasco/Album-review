import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/UserContext';

import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      // if not available returns undefined/null
      let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }
      const tokenRes = await Axios.post('/users/tokenIsValid', null, {headers: {'x-auth-token': token }});
      
      if (tokenRes.data) {
        const userRes = await Axios.get('/users/', {headers: {'x-auth-token': token}});
        setUserData({
          token,
          user: userRes.data
        });
      }
    }


    checkLoggedIn()
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
