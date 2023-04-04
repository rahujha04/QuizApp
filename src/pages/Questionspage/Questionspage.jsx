import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Questionspage = () => {
  const location = useLocation();
  const { problem } = location.state;
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question index
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  const handleOptionSelect = (optionIndex) => {
    console.log(optionIndex);
    const isCorrect = problem[currentQuestion].correctOptions.includes(optionIndex);
    setSelectedOption(optionIndex); // Update the selected option
    if (isCorrect) {
      setScore(score + 1); // Update the score if the selected option is correct
    }
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question after 1 second
      setSelectedOption(null); // Reset the selected option
    }, 1000);
  };


  const handleFinish = () => {
    // history.push('/result', { selectedOption }); // Navigate to the result page with the selected options
    navigate('/result', { state: { score } }); // Navigate to the result page with the selected options
  };

  return (
    <div>
      <h2>{problem[currentQuestion].prompt}</h2>
      <ul>
        {problem[currentQuestion].options.map((option, index) => (
          <li key={index}>
            <button disabled={selectedOption !== null} onClick={() => handleOptionSelect(index)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
      {currentQuestion === problem.length - 1 && selectedOption !== null && (
        <button onClick={handleFinish}>Finish</button>
      )}
    </div>
  );
};

export default Questionspage;
