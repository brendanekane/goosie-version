import { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAndSetSession } from '../../store/session';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch(),
    sessionUser = useSelector((state) => state.session.user),
    [credentialInput, setCredentialInput] = useState(''),
    [passwordInput, setPasswordInput] = useState(''),
    firstUpdate = useRef(true);

  if (sessionUser) return <Redirect to="/" />;

  const reset = () => {
    setCredentialInput('');
    setPasswordInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInput = {
      credential: credentialInput,
      password: passwordInput,
    };

    dispatch(loginAndSetSession(formInput));
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="credential-input">Email or Username: </label>
      <input
        type="text"
        id="credential-input"
        value={credentialInput}
        onChange={(e) => setCredentialInput(e.target.value)}
      />
      <br />
      <label htmlFor="password-input">Password: </label>
      <input
        type="password"
        id="password-input"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default LoginFormPage;
