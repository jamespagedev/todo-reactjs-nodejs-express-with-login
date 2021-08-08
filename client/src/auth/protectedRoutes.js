import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// components
import LoadingLogin from '../components/spinners/loadingLogin.js';

// globals
import { GlobalContext, frontendLinks, guestUserId } from '../globals/index.js';

const isLoggedIn = (userId) => {
  return userId > guestUserId; // ToDo: replace with checking token in sessionstorage
}

export const GuestRoute = ({ component, ...rest }) => {
  const {isLoggingIn, globalBackendData} = useContext(GlobalContext);
  const renderFn = (Component) => (props) => {
    if(isLoggingIn){
      return <div className="mt-200"><LoadingLogin /></div>;
    } else if(globalBackendData.isGlobalDataLoaded && isLoggedIn(globalBackendData.userInfo.id)) {
      return <Redirect to={frontendLinks.home} />;
    } else {
      return <Component {...props} />;
    }
  };

  return <Route {...rest} render={renderFn(component)} />
};

export const UserRoute = ({ component, ...rest }) => {
  const {globalBackendData} = useContext(GlobalContext);
  const renderFn = (Component) => (props) => {
    if(globalBackendData.isGlobalDataLoaded && isLoggedIn(globalBackendData.userInfo.id)) {
      return <Component {...props} />;
    } else {
      return <Redirect to={frontendLinks.homeLogin} />;
    }
  };

  return <Route {...rest} render={renderFn(component)} />
};