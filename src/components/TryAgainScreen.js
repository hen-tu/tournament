// src/components/TryAgainScreen.js
import React from 'react';

const TryAgainScreen = ({ onRetry }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2>😕 Try Again</h2>
      <p>You didn't answer enough questions correctly to unlock the next level.</p>
      <p>Try again to improve your score and move forward!</p>
      <button
        onClick={onRetry}
        style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '1rem' }}
      >
        Try Again
      </button>
    </div>
  );
};

export default TryAgainScreen;