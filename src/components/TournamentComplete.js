import React from 'react';

const TournamentComplete = ({ totalTickets, onRestart }) => {
  const handleShare = () => {
    const shareText = `🎉 I just completed the tournament and earned ${totalTickets} ticket(s)! Try it yourself: https://tournament-ecru.vercel.app`;
    const message = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-success mb-3">🏁 Tournament Complete!</h2>
        <p className="fs-5 mb-3">You earned a total of <strong>{totalTickets}</strong> ticket(s).</p>

        <div className="d-flex flex-column gap-2">
          <button className="btn btn-outline-success w-100" onClick={handleShare}>
            📤 Share My Score
          </button>

          <button
            className="btn btn-outline-primary w-100"
            onClick={() => {
              window.location.href = 'https://yourdomain.com/product/tournament-ticket/';
            }}
          >
            🎫 Play Again (Buy Ticket)
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentComplete;