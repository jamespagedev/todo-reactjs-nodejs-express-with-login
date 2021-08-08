import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from "react-helmet";

// components
import Header from './components/headers/header.js';

// auth
import { login } from './auth/authFunctions.js';
import { Routes } from "./auth/routes.js";

// globals
import { GlobalContext, guestUserId } from './globals/index.js';

const App = () => {
  // variables
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [globalBackendData, setGlobalBackendData] = useState({isGlobalDataLoaded: false, userInfo: {id: guestUserId}});
  const [headerStates, setHeaderStates] = useState({isAdminHeader: false});

  // functions
  /* note:
    systems with oidc authentication should use useEffect() instead of handleLogin(),
    and check first if the token is in the sessionStorage(handled by oidc-auth)
    before using login() to hand the token(instead of username/pwsd) to the backend for validating with oidc servers.
    Also, with signon being handled elsewhere, no login modal should be necessary, so the following can be removed:
      handleLogin(), isLoginClicked, setIsLoginClicked, <ModalLogin />
      ...and login() can be used to pass the token to the proxy for validation, and oidc-auth should handle refresh token as needed.
  */
  const handleLogin = (username, pswd) => {
    login(username, pswd, setIsLoggingIn, setGlobalBackendData);
  }

  // render
  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>ToDo</title>
      </Helmet>
      <GlobalContext.Provider value={{isLoggingIn, globalBackendData, headerStates, handleLogin, setHeaderStates}}>
        {globalBackendData.userInfo.id > guestUserId && <Header />}
        <Router children={Routes} basename={process.env.REACT_APP_PUBLIC_URL} />
        {/* Footer */}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
