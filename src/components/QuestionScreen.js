// src/components/QuestionScreen.js
import React, { useEffect, useState } from 'react';
import allQuestions from '../data/questions.json';
import LevelComplete from './LevelComplete';
import TryAgain from './TryAgain';
import TournamentComplete from './TournamentComplete';

const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const QuestionScreen = ({ user }) => {
  const [level, setLevel] = useState(1);
  const [correctAcrossLevels, setCorrectAcrossLevels] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  const levelKey = `level${level}`;
  const [quizQuestions, setQuizQuestions] = useState(getRandomQuestions(allQuestions[levelKey], 5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [disqualified, setDisqualified] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  useEffect(() => {
    const start = Date.now();
    return () => setTimeTaken(Math.round((Date.now() - start) / 1000));
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && selected === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selected === null) {
      handleAnswer(null);
    }
  }, [timeLeft, selected]);

  const handleAnswer = (choice) => {
    if (selected !== null) return;

    setSelected(choice);
    const isCorrect = choice === currentQuestion.correct;
    setFeedback(
      isCorrect
        ? '✅ Correct!'
        : `❌ Incorrect. Correct answer: ${currentQuestion.correct}`
    );
    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      const updatedTotalCorrect = correctAcrossLevels + 1;
      setCorrectAcrossLevels(updatedTotalCorrect);

      let ticketBonus = 0;
      if (newCorrectCount % 8 === 0) {
        if (level === 1) ticketBonus = 1;
        if (level === 2) ticketBonus = 5;
        if (level === 3) ticketBonus = 10;
        setTickets(tickets + ticketBonus);
        setTotalTickets(totalTickets + ticketBonus);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(10);
      setSelected(null);
      setFeedback('');
    } else {
      if (correctCount < 2 && level < 3) {
        setDisqualified(true);
      } else {
        setShowResults(true);
      }
    }
  };

  if (disqualified) {
    return <TryAgain />;
  }

  if (showResults) {
    return (
      level < 3 ? (
        <LevelComplete
          score={correctCount}
          tickets={tickets}
          timeTaken={timeTaken}
          onNextLevel={() => {
            const nextLevel = level + 1;
            setLevel(nextLevel);
            setQuizQuestions(getRandomQuestions(allQuestions[`level${nextLevel}`], 5));
            setCurrentIndex(0);
            setCorrectCount(0);
            setTickets(0);
            setShowResults(false);
            setTimeLeft(10);
            setSelected(null);
            setFeedback('');
          }}
        />
      ) : (
        <TournamentComplete totalTickets={totalTickets} />
      )
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '600px' }}>
        <h5 className="text-muted mb-2">Welcome, {user}</h5>
        <h3 className="mb-3">Level {level}</h3>
        <p>Total Tickets: 🎟️ {totalTickets}</p>

        {/* Progress Bar */}
        <div className="progress mb-3" style={{ height: '20px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{
              width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`
            }}
            aria-valuenow={currentIndex + 1}
            aria-valuemin="0"
            aria-valuemax={quizQuestions.length}
          >
            {currentIndex + 1} / {quizQuestions.length}
          </div>
        </div>

        <p className="mb-2">⏱️ Time left: {timeLeft}s</p>
        <h5 className="mb-3">{currentQuestion.text}</h5>

        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={!!selected}
            className={`btn btn-outline-dark mb-2 w-100 text-start ${
              selected === option ? 'active' : ''
            }`}
          >
            {option}
          </button>
        ))}

        {feedback && <p className="fw-bold mt-3">{feedback}</p>}

        {selected && (
          <button className="btn btn-primary mt-3" onClick={handleNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;