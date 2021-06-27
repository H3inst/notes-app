import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../config/routes';
import { firebase } from '../config/firebase';
import { NotesScreen } from '../components/notes/NotesScreen';
import { AuthRoutes } from './AuthRoutes';
import { login } from '../ducks/auth';
import { finishChecking, setChecking } from '../ducks/ui';
import { Loader } from '../components/loader/loader';
import { startLoadNotes } from '../ducks/notes';

export const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { checking } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChecking());
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      dispatch(finishChecking());
    });
  }, [dispatch]);

  return (
    <Router>
      {checking && <Loader />}
      <div>
        <Switch>
          {isLoggedIn ? (
            <Route path={routes.root} component={NotesScreen} exact />
          ) : (
            <Route path={routes.auth} component={AuthRoutes} />
          )}
          <Redirect to={isLoggedIn ? routes.root : routes.auth} />
        </Switch>
      </div>
    </Router>
  );
};
