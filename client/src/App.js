import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from "react-helmet";

// components
import Header from './components/headers/header.js';

// auth
import { login, silentLogin, logout } from './auth/authFunctions.js';
import { Routes } from "./auth/routes.js";

// globals
import { GlobalContext, guestUserId } from './globals/index.js';

const App = () => {
  // variables
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [globalBackendData, setGlobalBackendData] = useState({userInfo: {id: guestUserId, name: "", token: null}});
  const [headerStates, setHeaderStates] = useState({isAdminHeader: false});

  // functions
  const handleLogin = (username, pswd) => {
    login(username, pswd, setIsLoggingIn, setGlobalBackendData);
  }
  const handleLogout = () => {
    logout(setGlobalBackendData);
  }

  // setup
  useEffect(() => silentLogin(setGlobalBackendData), []);

  // render
  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>ToDo</title>
      </Helmet>
      <GlobalContext.Provider value={{isLoggingIn, globalBackendData, headerStates, setHeaderStates, handleLogin, handleLogout}}>
        {globalBackendData.userInfo.id > guestUserId && <Header />}
        <Router children={Routes} basename={process.env.REACT_APP_PUBLIC_URL} />
        {/* Footer */}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
