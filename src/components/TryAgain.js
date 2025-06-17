import React from 'react';

const TryAgain = () => {
  const handleReplay = () => {
    window.location.href = 'https://yourdomain.com/product/tournament-ticket/';
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-danger mb-3">😞 Try Again</h2>
        <p className="fs-5 mb-4">You didn’t get enough correct answers to unlock the next level.</p>
        <p className="mb-4">Want to try again? Purchase another entry to rejoin the tournament!</p>

        <button className="btn btn-primary w-100" onClick={handleReplay}>
          🔁 Try Again (Buy Ticket)
        </button>
      </div>
    </div>
  );
};

export default TryAgain;