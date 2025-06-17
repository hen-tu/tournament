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
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-success text-center mb-3">🎉 Level Complete!</h2>

        <p className="fs-5 text-center">✅ Correct Answers: <strong>{score}/5</strong></p>
        <p className="fs-5 text-center">🎟️ Tickets Earned: <strong>{tickets}</strong></p>
        <p className="text-center text-muted">⏱️ Time Taken: {timeTaken} seconds</p>

        <h4 className="mt-4">🏆 Leaderboard</h4>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th className="text-center">Score</th>
              <th className="text-center">Time</th>
              <th className="text-center">Tickets</th>
            </tr>
          </thead>
          <tbody>
            {sampleLeaderboard.map((player, i) => (
              <tr
                key={i}
                className={player.name === 'You' ? 'table-warning' : ''}
              >
                <td>{player.name}</td>
                <td className="text-center">{player.score}</td>
                <td className="text-center">{player.time}s</td>
                <td className="text-center">{player.tickets}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex flex-column gap-2 mt-4">
          <button className="btn btn-primary w-100" onClick={onNextLevel}>
            Next Level →
          </button>
          <button className="btn btn-outline-success w-100" onClick={handleShare}>
            📤 Share My Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;