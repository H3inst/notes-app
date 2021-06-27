import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { registerWithEmailPassword } from '../../ducks/auth';
import { removeError, setError } from '../../ducks/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);

	const { values, handleInputChange } = useForm({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { name, email, password, confirmPassword } = values;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(registerWithEmailPassword(name, email, password));
		}
	};

	const isFormValid = () => {

		if (validator.isEmpty(name)) {
			dispatch(setError('Make sure to use a valid name.'));
			return false;

		} else if (!validator.isEmail(email)) {
			dispatch(setError('The email you are trying to use is invalid.'));
			return false;

		} else if (password !== confirmPassword || password.trim().length < 6) {
			dispatch(
				setError(
					'The password should have at least 6 characters and match each other.'
				)
			);
      
			return false;
		}

		dispatch(removeError());
		return true;
	};

	return (
		<form onSubmit={handleRegister} className="mt-5">
			<div className="mb-3">
				<label className="form-label">Name</label>
				<input
					type="text"
					className="form-control"
					placeholder="Galileo Galilei"
					name="name"
					onChange={handleInputChange}
				/>
			</div>
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
			<div className="mb-3">
				<label className="form-label">Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="**********"
					name="password"
					onChange={handleInputChange}
				/>
			</div>
			<div className="mb-4">
				<label className="form-label">Confirm password</label>
				<input
					type="password"
					className="form-control"
					placeholder="**********"
					name="confirmPassword"
					onChange={handleInputChange}
				/>
			</div>
			<button
				type="submit"
				className="mb-3 btn btn-primary btn-lg w-100"
				disabled={loading}
			>
				{loading && (
					<span
						className="spinner-border spinner-border-sm "
						role="status"
						aria-hidden="true"
					></span>
				)}
				<span className="mx-2">Sign up</span>
			</button>
		</form>
	);
};
