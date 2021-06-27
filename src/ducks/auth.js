import { firebase, googleAuthProvider } from '../config/firebase';
import { finishLoading, setError, setLoading } from './ui';

const INITIAL_STATE = {};
// Types
const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

// Reducer
export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };

    case AUTH_LOGOUT:
      return {};

    default:
      return state;
  }
}

// Actions
export const login = (uid, displayName) => {
  return {
    type: AUTH_LOGIN,
    payload: { uid, displayName },
  };
};

export const loginEmailPassword = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(login(user.uid, user.displayName));

  } catch (error) {
    const { message } = error;
    dispatch(setError(message));
    dispatch(finishLoading());
    
  } finally {
    dispatch(finishLoading());
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
    dispatch(login(user.uid, user.displayName));

  } catch (error) {
    const { message } = error;
    dispatch(setError(message));
    dispatch(finishLoading());

  } finally {
    dispatch(finishLoading());
  }
};

export const registerWithEmailPassword =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch(setLoading());
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
      dispatch(login(user.uid, user.displayName));

    } catch (error) {
      const { message } = error;
      dispatch(setError(message));
      dispatch(finishLoading());

    } finally {
      dispatch(finishLoading());
    }
  };

export const startLogout = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch(logout());
    
  } catch (error) {
    const { message } = error;
    dispatch(setError(message));
  }
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
