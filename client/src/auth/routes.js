import { Switch } from "react-router-dom";

// views
import HomeLogin from '../views/homeLogin.js';
import Home from '../views/home.js';

// authentication
import { GuestRoute, UserRoute } from './protectedRoutes.js';

// globals
import { frontendLinks } from '../globals/index.js';

export const Routes = (
  <Switch>
    <GuestRoute exact path={frontendLinks.homeLogin} component={HomeLogin}></GuestRoute>
    <UserRoute exact path={frontendLinks.home} component={Home}></UserRoute>
  </Switch>
);