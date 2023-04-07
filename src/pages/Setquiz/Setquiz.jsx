import React, { useState } from 'react'
import './setquiz.css'



// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyD9xpYWX00FfUjsO4Us8cuJW-UDcXm2-SA",
  authDomain: "react-quiz-app-47ae1.firebaseapp.com",
  databaseURL: "https://react-quiz-app-47ae1-default-rtdb.firebaseio.com",
  projectId: "react-quiz-app-47ae1",
  storageBucket: "react-quiz-app-47ae1.appspot.com",
  messagingSenderId: "526945090838",
  appId: "1:526945090838:web:f62496e01d703c4cc46437",
  measurementId: "G-R9F0KE4PXM"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const Setquiz = () => {

  const [quiz, setQuiz] = useState({
    quizname: "",
    timelimit: "",
    description: "",
    questions: [],
  });

  const { quizname, timelimit, description, questions } = quiz;

  const handleAddQuestion = (event) => {
    event.preventDefault();
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { prompt: "", options: [], correctOptions: [] },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((_, i) => i !== index),
    });
  };

  const handleUpdatePrompt = (index, prompt) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].prompt = prompt;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAddOption = (index, event) => {
    event.preventDefault();
    const newQuestions = [...quiz.questions];
    if (newQuestions[index].options.length >= 4) {
      console.log("Can't add more than 4 options");
      return;
    }
    newQuestions[index].options.push("");
    setQuiz({ ...quiz, questions: newQuestions });
  };


  const handleAddCorrectOption = (index, event) => {
    event.preventDefault();
    const newQuestions = [...quiz.questions];
    if (newQuestions[index].correctOptions.length >= 4) {
      console.log("Can't add more than 4 correct options");
      return;
    }
    newQuestions[index].correctOptions.push("");
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleUpdateOption = (index, optionIndex, option) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].options[optionIndex] = option;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleUpdateCorrectOption = (
    index,
    correctOptionIndex,
    correctOption
  ) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].correctOptions[correctOptionIndex] = correctOption;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleDeleteOption = (index, optionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].options = newQuestions[index].options.filter(
      (_, i) => i !== optionIndex
    );
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleDeleteCorrectOption = (index, correctOptionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].correctOptions = newQuestions[index].correctOptions.filter((_, i) => i !== correctOptionIndex);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const navigate = useNavigate();


  const onSubmit = async (event) => {
    event.preventDefault();

    // Use object spread syntax to create a new quiz object with updated questions array
    const newQuiz = { ...quiz, questions: [...questions] };

    // console.log(newQuiz);

    const problemsCollection = db.collection('problems');
    const problems = newQuiz.questions.map((q) => ({
      prompt: q.prompt,
      options: q.options,
      correctOptions: q.correctOptions,
    }));

    try {
      const docRef = await problemsCollection.add({ problems });
      // console.log(`Problems ${docRef.id} added to the database`);
      const quizData = {
        name: newQuiz.quizname,
        timeLimit: newQuiz.timelimit,
        description: newQuiz.description,
        problems: docRef.id,
      };
      const quizzesCollection = db.collection('quizzes');
      await quizzesCollection.add(quizData);
      // console.log(`Quiz added to the database`);
      setQuiz({
        quizname: '',
        timelimit: '',
        description: '',
        questions: [],
      });
    } catch (error) {
      console.error(error);
    }

    navigate('/');
  };




  return (
    <div className="setquiz">
      <div className="setquiz__container">
        <form onSubmit={onSubmit}>
          {/* <form> */}
          {/* <h2>Quiz Name</h2> */}
          <div className="form-group">
            <label htmlFor="quizname">Enter Quiz Name: </label>
            <input
              type="text"
              id="quizname"
              value={quiz.quizname}
              onChange={(event) => setQuiz({ ...quiz, quizname: event.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timelimit">Enter Number Of seconds Given Per Question: </label>
            <input
              type="text"
              id="timelimit"
              value={quiz.timelimit}
              onChange={(event) => setQuiz({ ...quiz, timelimit: event.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Enter Quiz Description: </label>
            <input
              type="text"
              id="description"
              value={quiz.description}
              onChange={(event) => setQuiz({ ...quiz, description: event.target.value })}
            />
          </div>

          <div className='form-group'>
            <button className='btn' onClick={handleAddQuestion}>Add Question</button>
            {quiz.questions.map((question, index) => (
              <div key={index}>
                <button className='btn' onClick={() => handleDeleteQuestion(index)}>Delete Question</button>
                <div className='form-group__container'>
                  <label>
                    Question: <br />
                    <input type="text" value={question.prompt} onChange={(event) => handleUpdatePrompt(index, event.target.value)} />
                  </label>
                </div>
                <div>
                  Add Options: <br />
                  <button className='btn' onClick={(e) => handleAddOption(index, e)}>Add option</button>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input type="text" value={option} onChange={(event) => handleUpdateOption(index, optionIndex, event.target.value)} />
                      <button className='btn' onClick={() => handleDeleteOption(index, optionIndex)}>Delete</button>
                    </div>
                  ))}
                </div>
                <br />

                <div>
                  Add Correct Options Indexs: <br />
                  <button className='btn' onClick={(e) => handleAddCorrectOption(index, e)}>Add Correct Option Index</button>
                  {question.correctOptions.map((correctOption, correctOptionIndex) => (
                    <div key={correctOptionIndex}>
                      <input type="text" value={correctOption} onChange={(event) => handleUpdateCorrectOption(index, correctOptionIndex, event.target.value)} />
                      <button className='btn' onClick={() => handleDeleteCorrectOption(index, correctOptionIndex)}>Delete</button>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
          <button className='btn' type="submit">Submit</button>
        </form>

      </div>
    </div>
  )
}

export default Setquiz;


