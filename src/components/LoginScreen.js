import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleStart = (e) => {
    e.preventDefault(); // Prevent default form submit
    if (email.trim()) {
      onLogin(email.trim());
    } else {
      alert('Please enter your email to begin.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">🎯 Enter Tournament</h2>

        <form onSubmit={handleStart}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Your Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;