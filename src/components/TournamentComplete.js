// src/components/TournamentComplete.js
import React from 'react';

const TournamentComplete = ({ totalTickets, onRestart }) => {
  const handleShare = () => {
    const message = encodeURIComponent(
      `I completed all 3 levels and earned ${totalTickets} bonus ticket(s)! Can you beat me?\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🎉 Tournament Complete!</h2>
      <p>You finished all levels and earned:</p>
      <h3>{totalTickets} Bonus Tickets</h3>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={onRestart}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
        >
          Restart Tournament
        </button>
        <button onClick={handleShare} style={{ padding: '0.5rem 1rem' }}>
          Share My Score
        </button>
      </div>
    </div>
  );
};

export default TournamentComplete;