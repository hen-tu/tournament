// src/components/LevelComplete.js
import React from 'react';

const sampleLeaderboard = [
  { name: 'Rivka G.', score: 5, time: 28, tickets: 1 },
  { name: 'Dovid S.', score: 5, time: 31, tickets: 1 },
  { name: 'You', score: 4, time: 35, tickets: 0 },
];

const LevelComplete = ({ score, tickets, timeTaken, onNextLevel }) => {
  const handleShare = () => {
    const shareText = `I scored ${score}/5 and earned ${tickets} ticket(s) in the tournament! Try to beat me!`;
    const url = window.location.href;
    const message = encodeURIComponent(`${shareText}\n${url}`);

    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🎉 Level Complete!</h2>
      <p>You got <strong>{score}/5</strong> correct.</p>
      <p>Bonus Tickets Earned: <strong>{tickets}</strong></p>
      <p>Time Taken: <strong>{timeTaken} seconds</strong></p>

      <h3 style={{ marginTop: '2rem' }}>🏆 Leaderboard</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th>Score</th>
            <th>Time</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {sampleLeaderboard.map((player, i) => (
            <tr key={i} style={{ backgroundColor: player.name === 'You' ? '#f0f0f0' : 'transparent' }}>
              <td>{player.name}</td>
              <td align="center">{player.score}</td>
              <td align="center">{player.time}s</td>
              <td align="center">{player.tickets}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={onNextLevel}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
        >
          Next Level
        </button>
        <button onClick={handleShare} style={{ padding: '0.5rem 1rem' }}>
          Share My Score
        </button>
      </div>
    </div>
  );
};

export default LevelComplete;