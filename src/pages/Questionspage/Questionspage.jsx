import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './questionspage.css';

const QuestionsPage = () => {
  const location = useLocation();

  const { problem, timelimit } = location.state;

  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question index
  const [selectedOptions, setSelectedOptions] = useState([]); // Track the selected options for the current question
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(parseInt(timelimit)); // Track the time left for the current question

  const problemSize = problem.length;
  // console.log(problemSize);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setSelectedOptions([]); // Reset the selected options
        if (currentQuestion === problem.length - 1) {
          console.log(score);
          navigate('/result', { state: { score, problemSize } });
          return;
        }
        setCurrentQuestion(currentQuestion + 1); // Move to the next question
        setTimeLeft(timelimit); // Reset the time limit for the next question
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionSelect = (optionIndex) => {
    if (selectedOptions.includes(optionIndex)) {
      setSelectedOptions(selectedOptions.filter((index) => index !== optionIndex));
    } else {
      setSelectedOptions([...selectedOptions, optionIndex]);
    }
  };

  const handleQuestionSubmit = () => {
    const selectedOptionsStrings = selectedOptions.map((optionIndex) => (optionIndex + 1).toString());
    console.log(selectedOptionsStrings);
    console.log(problem[currentQuestion].correctOptions);
    const isCorrect = selectedOptionsStrings.every((optionIndexString) =>
      problem[currentQuestion].correctOptions.includes(optionIndexString)
    );

    let updatedScore = score;

    console.log(isCorrect);
    if (isCorrect) {
      updatedScore = score + 1; // Update the score if all selected options are correct
      setScore(updatedScore);
      if (currentQuestion === problem.length - 1) {
        navigate('/result', { state: { score: updatedScore, problemSize } });
        return;
      }
    }
    
    setSelectedOptions([]); // Reset the selected options
    // console.log(score);
    if (currentQuestion === problem.length - 1) {
      navigate('/result', { state: { score: updatedScore, problemSize } });
      // If the current question is the last question, display the "Finish" button
      return;
    }
    setCurrentQuestion(currentQuestion + 1); // Move to the next question
    setTimeLeft(timelimit); // Reset the time limit for the next question
  };

  return (
    <div className="questions-container">
      {problem && problem[currentQuestion] && (
        <div className="question-card">
          <h1>Time Left: {timeLeft} seconds</h1>
          <h2 className="question-prompt">{problem[currentQuestion].prompt}</h2>
          <ul className="question-options">
            {problem[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  className={`option-button ${selectedOptions.includes(index) ? 'selected' : 'deselected'}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {currentQuestion < problem.length && (
            <button className='btn' disabled={selectedOptions.length === 0} onClick={handleQuestionSubmit}>
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
