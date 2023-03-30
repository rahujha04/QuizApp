import React, { useEffect, useState } from 'react'
import './setquiz.css'
import db from '../../../firebase';

const Setquiz = () => {

  const [quizname, setQuizname] = useState("");
  const [timelimit, setTimelimit] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { prompt: '', options: [], correctOptions: [] }]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleUpdatePrompt = (index, prompt) => {
    const newQuestions = [...questions];
    newQuestions[index].prompt = prompt;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    if (newQuestions[index].options.length >= 4) {
      console.log("Can't add more than 4 options")
      return;
    }
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const handleAddCorrectOption = (index) => {
    const newQuestions = [...questions];
    if (newQuestions[index].correctOptions.length >= 4) {
      console.log("Can't add more than 4 correct options")
      return;
    }
    newQuestions[index].correctOptions.push('');
    setQuestions(newQuestions);
  };

  const handleUpdateOption = (index, optionIndex, option) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = option;
    setQuestions(newQuestions);
  };

  const handleUpdateCorrectOption = (index, correctOptionIndex, correctOption) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOptions[correctOptionIndex] = correctOption;
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (index, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options = newQuestions[index].options.filter((_, i) => i !== optionIndex);
    setQuestions(newQuestions);
  };

  const handleDeleteCorrectOption = (index, correctOptionIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOptions = newQuestions[index].correctOptions.filter((_, i) => i !== correctOptionIndex);
    setQuestions(newQuestions);
  };


  useEffect(() => {

    db.collection('problems').add({
      problem
    })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    setQuizname('');
    setTimelimit('');
    setDescription('');
  }


  return (
    <div className="setquiz">
      <div className="setquiz__container">
        <form onSubmit={onSubmit}>
          {/* <form> */}
          {/* <h2>Quiz Name</h2> */}
          <div className="form-group">
            <label htmlFor="quizname">Quiz Name</label>
            <input
              type="text"
              id="quizname"
              value={quizname}
              onChange={(event) => setQuizname(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timelimit">Time Limit</label>
            <input
              type="text"
              id="timelimit"
              value={timelimit}
              onChange={(event) => setTimelimit(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Quiz Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <button onClick={handleAddQuestion}>Add question</button>
            {questions.map((question, index) => (
              <div key={index}>
                <button onClick={() => handleDeleteQuestion(index)}>Delete question</button>
                <div>
                  <label>
                    Prompt:
                    <input type="text" value={question.prompt} onChange={(event) => handleUpdatePrompt(index, event.target.value)} />
                  </label>
                </div>
                <div>
                  Options:
                  <button onClick={() => handleAddOption(index)}>Add option</button>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input type="text" value={option} onChange={(event) => handleUpdateOption(index, optionIndex, event.target.value)} />
                      <button onClick={() => handleDeleteOption(index, optionIndex)}>Delete option</button>
                    </div>
                  ))}
                </div>

                <div>
                  Correct Options:
                  <button onClick={() => handleAddCorrectOption(index)}>Add correct option</button>
                  {question.correctOptions.map((correctOption, correctOptionIndex) => (
                    <div key={correctOptionIndex}>
                      <input type="text" value={correctOption} onChange={(event) => handleUpdateCorrectOption(index, correctOptionIndex, event.target.value)} />
                      <button onClick={() => handleDeleteCorrectOption(index, correctOptionIndex)}>Delete correct option</button>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>


          <button type="submit">submit</button>
        </form>

      </div>
    </div>
  )
}

export default Setquiz;



// In this component, we have a state variable called questions, which is an array that holds the questions and their options. We also have several functions that handle adding, deleting, and updating questions and options.

// To add a question, we use the handleAddQuestion function, which adds a new question object with an empty prompt and an empty options array to the questions array using the setQuestions function.

// To delete a question, we use the handleDeleteQuestion function, which removes the question at the specified index from the questions array using the filter function.

// To update a question prompt, we use the handleUpdatePrompt function, which creates a copy of the questions array, updates the prompt of the question at the specified index, and sets the new array using the setQuestions function.

// To add an option, we use the handleAddOption function, which creates a copy of the questions array, adds an empty string to the options array of the question at the specified index, and sets the new array using the setQuestions function.

// To update an option, we use the handleUpdateOption function
