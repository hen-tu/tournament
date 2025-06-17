import React, { useState } from 'react';
import QuestionScreen from './components/QuestionScreen';
import LoginScreen from './components/LoginScreen';

function App() {
  const [user, setUser] = useState(localStorage.getItem('tournamentUser') || '');

  const handleLogin = (email) => {
    localStorage.setItem('tournamentUser', email);
    setUser(email);
  };

  return (
    <div>
      {!user ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <QuestionScreen user={user} />
      )}
    </div>
  );
}

export default App;