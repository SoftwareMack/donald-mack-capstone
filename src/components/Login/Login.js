import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.scss'; // Import your SCSS file for styling

const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Replace this with your actual login logic or API call
    // For simplicity, we're checking if the loginInput is '1234'
    if (loginInput === '1234') {
      // Successful login, redirect to the dashboard
      history.push('/dashboard');
    } else {
      // Incorrect login
      setLoginAttempts(loginAttempts + 1);
      setLoginInput('');
      setErrorMessage('Incorrect login. Please try again.');

      // After 3 failed attempts, redirect to the signup page
      if (loginAttempts >= 2) {
        setErrorMessage('Too many incorrect attempts. Redirecting to signup page.');
        setTimeout(() => {
          history.push('/signup');
        }, 2000); // Redirect after 2 seconds
      }
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      {errorMessage && <p className="login__error">{errorMessage}</p>}
      <label htmlFor="loginInput" className="login__label">Enter 4-digit Login:</label>
      <input
        type="password"
        id="loginInput"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        className="login__input"
      />
      <button onClick={handleLogin} className="login__button">Login</button>
      <p className="login__signup-link">
        Don't have an account? <Link to="/signup" className="login__signup-link">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
