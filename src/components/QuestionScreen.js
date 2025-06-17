// src/components/QuestionScreen.js
import React, { useEffect, useState } from 'react';
import allQuestions from '../data/questions.json';
import LevelComplete from './LevelComplete';
import TournamentComplete from './TournamentComplete';
import TryAgainScreen from './TryAgainScreen';

const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const QuestionScreen = ({ user }) => {
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('level')) || 1);
  const [correctAcrossLevels, setCorrectAcrossLevels] = useState(() => parseInt(localStorage.getItem('correctAcrossLevels')) || 0);
  const [totalTickets, setTotalTickets] = useState(() => parseInt(localStorage.getItem('totalTickets')) || 0);
  const [quizQuestions, setQuizQuestions] = useState(() => getRandomQuestions(allQuestions[`level${level}`], 5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [tournamentDone, setTournamentDone] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

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
      handleAnswer('__timeout__');
    }
  }, [timeLeft, selected]);

  const saveProgress = (level, correct, tickets) => {
    localStorage.setItem('level', level);
    localStorage.setItem('correctAcrossLevels', correct);
    localStorage.setItem('totalTickets', tickets);
  };

  const handleAnswer = (choice) => {
    if (selected !== null) return;

    setSelected(choice);
    const isCorrect = choice && choice === currentQuestion.correct;
    setFeedback(
      isCorrect ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${currentQuestion.correct}`
    );
    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      const updatedTotalCorrect = correctAcrossLevels + 1;
      const newCorrectAcrossLevels = updatedTotalCorrect;
      setCorrectCount(newCorrectCount);
      setCorrectAcrossLevels(newCorrectAcrossLevels);

      let ticketBonus = 0;
      if (newCorrectCount % 8 === 0) {
        if (level === 1) ticketBonus = 1;
        if (level === 2) ticketBonus = 5;
        if (level === 3) ticketBonus = 10;
        setTickets(tickets + ticketBonus);
        setTotalTickets(prev => {
          const total = prev + ticketBonus;
          saveProgress(level, newCorrectAcrossLevels, total);
          return total;
        });
      } else {
        saveProgress(level, newCorrectAcrossLevels, totalTickets);
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
      if (correctCount >= 2 || level === 3) {
        setShowResults(true);
      } else {
        setTryAgain(true);
      }
    }
  };

  const handleRestart = () => {
    localStorage.clear();
    window.location.reload();
  };

  const retryLevel = () => {
    setQuizQuestions(getRandomQuestions(allQuestions[`level${level}`], 5));
    setCurrentIndex(0);
    setCorrectCount(0);
    setTickets(0);
    setTryAgain(false);
    setTimeLeft(10);
    setSelected(null);
    setFeedback('');
  };

  if (tournamentDone) {
    return <TournamentComplete totalTickets={totalTickets} onRestart={handleRestart} />;
  }

  if (tryAgain) {
    return <TryAgainScreen onRetry={retryLevel} />;
  }

  if (showResults) {
    return (
      <LevelComplete
        score={correctCount}
        tickets={tickets}
        timeTaken={timeTaken}
        onNextLevel={() => {
          if (level < 3) {
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
            saveProgress(nextLevel, correctAcrossLevels, totalTickets);
          } else {
            setTournamentDone(true);
          }
        }}
      />
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Welcome, {user}</h2>
      <h3>Level {level}</h3>
      <h3>Total Tickets: {totalTickets}</h3>
      <p>Time left: {timeLeft}s</p>

      <h3>{currentQuestion.text}</h3>

      {currentQuestion.options.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={!!selected}
          style={{
            display: 'block',
            margin: '0.5rem 0',
            padding: '0.5rem 1rem',
            backgroundColor: selected === option ? '#ddd' : '#eee',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left'
          }}
        >
          {option}
        </button>
      ))}

      {feedback && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{feedback}</p>}

      {selected && (
        <button
          onClick={handleNext}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuestionScreen;
