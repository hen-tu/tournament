// src/App.js
import React, { useState } from 'react';
import QuestionScreen from './components/QuestionScreen';

const App = () => {
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (email) => {
    if (email.includes('@')) {
      setUser(email);
      setHasAccess(true);
    }
  };

  if (!hasAccess) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
        <h1>Enter Tournament</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button
          onClick={() => handleLogin(email)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Enter Tournament
        </button>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          (Temporary login, no password needed)
        </p>
      </div>
    );
  }

  return <QuestionScreen user={user} />;
};

export default App;