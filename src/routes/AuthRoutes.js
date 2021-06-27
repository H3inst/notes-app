import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import routes from '../config/routes';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AuthRoutes = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container bg-white rounded shadow">
        <div className="d-flex justify-content-around">
          <NavLink
            to={routes.loginRoute}
            activeClassName="border-bottom border-primary border-5"
            className="text-decoration-none text-dark fw-bold fs-4 pb-1 px-2"
          >
            Login
          </NavLink>
          <NavLink
            to={routes.registerRoute}
            activeClassName="border-bottom border-primary border-5"
            className="text-decoration-none text-dark fw-bold fs-4 pb-1 px-2"
          >
            Register
          </NavLink>
        </div>
        <Switch>
          <Route path={routes.registerRoute} component={RegisterScreen} />
          <Route path={routes.loginRoute} component={LoginScreen} />
          <Redirect to={routes.loginRoute} />
        </Switch>
      </div>
    </div>
  );
};
