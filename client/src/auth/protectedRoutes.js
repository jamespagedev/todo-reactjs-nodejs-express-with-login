import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// components
import LoadingLogin from '../components/spinners/loadingLogin.js';

// globals
import { GlobalContext, frontendLinks } from '../globals/index.js';

export const GuestRoute = ({ component, ...rest }) => {
  const {isLoggingIn, globalBackendData} = useContext(GlobalContext);
  const renderFn = (Component) => (props) => {
    if(isLoggingIn){
      return <div className="mt-200"><LoadingLogin /></div>;
    } else if(globalBackendData.userInfo.id > 0) {
      return <Redirect to={frontendLinks.home} />
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={renderFn(component)} />;
};

export const UserRoute = ({ component, ...rest }) => {
  const {globalBackendData} = useContext(GlobalContext);
  const renderFn = (Component) => (props) => {
    if(globalBackendData.userInfo.id > 0) {
      return <Component {...props} />;
    }
    return <Redirect to={frontendLinks.homeLogin} />;
  };

  return <Route {...rest} render={renderFn(component)} />
};