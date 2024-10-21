// src/components/LoginSignup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    // Send login request to backend
    fetch('http://127.0.0.1:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login successful:', data);
        // Redirect to main page
        navigate('/main');
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const signupData = {
      username: username,
      email: email,
      password: password,
    };

    // Send signup request to backend
    fetch('http://127.0.0.1:8000/auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Signup successful:', data);
      })
      .catch(error => {
        console.error('Signup error:', error);
      });
  };

  const handleGoogleOAuth = () => {
    window.location.href = 'http://127.0.0.1:3000/auth/login/google/';
  };

  return (
    <div className="login-signup-container">
      <h1>PRIVNOTE</h1>
      <hr />

      <div className="button-group">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Signup</button>
      </div>

      {isLogin ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>

          <button type="submit">Login</button>
          <button type="button" onClick={handleGoogleOAuth}>Login with Google</button>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label htmlFor="new-username">Username</label>
            <input type="text" id="new-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
          </div>

          <div className="form-group">
            <label htmlFor="new-password">Password</label>
            <input type="password" id="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>

          <button type="submit">Signup</button>
        </form>
      )}
    </div>
  );
}

export default LoginSignup;
