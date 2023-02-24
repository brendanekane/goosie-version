import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAndSetSession } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch(),
    [credentialInput, setCredentialInput] = useState(''),
    [passwordInput, setPasswordInput] = useState('');

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

export default LoginForm;
