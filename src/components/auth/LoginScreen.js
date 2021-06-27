import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { loginEmailPassword, loginWithGoogle } from '../../ducks/auth';
import { removeError, setError } from '../../ducks/ui';

import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);
  const { values, handleInputChange } = useForm({
    email: '',
    password: '',
  });
  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(loginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const isFormValid = () => {
    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      dispatch(setError('Fields cannot be empty.'));
      return false;
      
    } else if (!validator.isEmail(email)) {
      dispatch(setError('The email you are trying to use is invalid.'));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <form onSubmit={handleLogin} className="mt-5">
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="text"
          className="form-control"
          placeholder="name@example.com"
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="**********"
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="mb-4 btn btn-primary btn-lg w-100"
        disabled={loading}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        <span className="mx-2">Sign in</span>
      </button>
      <p
        className="text-primary text-decoration-underline text-center"
        onClick={!loading ? handleGoogleLogin : () => {}}
      >
        Or sign in with Google
      </p>
    </form>
  );
};
