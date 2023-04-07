import React  from 'react';
import { useLocation } from 'react-router-dom';
import './result.css';

const Result = () => {
  const location = useLocation();
  const { score, problemSize } = location.state || {};

  // calculate percentage and assign grade based on percentage
  const percentage = (score / problemSize) * 100;
  let grade = '';
  let feedback = '';
  if (percentage >= 90) {
    grade = 'A';
    feedback = 'Excellent job!';
  } else if (percentage >= 80) {
    grade = 'B';
    feedback = 'Good job!';
  } else if (percentage >= 70) {
    grade = 'C';
    feedback = 'Not bad, but you can do better.';
  } else if (percentage >= 60) {
    grade = 'D';
    feedback = 'You need to work harder.';
  } else {
    grade = 'F';
    feedback = 'You need to study more.';
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">Your Score:</h1>
        <h2 className="result-score">{score}/{problemSize}</h2>
        <h3 className="result-percentage">Your Percentage: {percentage}%</h3>
        <h3 className="result-grade">Your Grade: {grade}</h3>
        <p className="result-feedback">{feedback}</p>
      </div>
    </div>
  );
};

export default Result;
