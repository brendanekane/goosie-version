import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupAndSetSession } from '../../store/session';

const SignupFormPage = () => {
  const dispatch = useDispatch(),
    [emailInput, setEmailInput] = useState(''),
    [usernameInput, setUsernameInput] = useState(''),
    [passwordInput, setPasswordInput] = useState('');

  const reset = () => {
    setEmailInput('');
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInput = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    };

    dispatch(signupAndSetSession(formInput));
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-email-container">
        <label htmlFor="signup-email">Email:</label>
        <input
          type="text"
          id="signup-email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>
      <div className="signup-username-container">
        <label htmlFor="signup-username">Username:</label>
        <input
          type="text"
          id="signup-username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </div>
      <div className="signup-password-container">
        <label htmlFor="signup-password">Password:</label>
        <input
          type="password"
          id="signup-password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <button className="signup-submit">Submit</button>
    </form>
  );
};

export default SignupFormPage;
