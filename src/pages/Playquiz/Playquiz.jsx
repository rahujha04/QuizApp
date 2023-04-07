import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './playquiz.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import { Link } from 'react-router-dom';
import { MenuItem, Select, InputLabel } from '@mui/material';

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

const firestore = firebase.firestore();

const Playquiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesRef = firestore.collection('quizzes');
      const quizzesSnapshot = await quizzesRef.get();
      const quizzesList = quizzesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(quizzesList);
      // console.log(quizzesList);
    };
    fetchQuizzes();
  }, []);

  const navigate = useNavigate();

  const handleQuizSelection = async (event) => {
    const quizId = event.target.value;
    const quizRef = firestore.collection('quizzes').doc(quizId);
    const quizDoc = await quizRef.get();
    const quizData = quizDoc.data();
    const problemIds = quizData.problems;

    // console.log(quizData);
  
    const problemRef = firestore.collection('problems').doc(problemIds);
    const problemDoc = await problemRef.get();
    const problemData = problemDoc.data();
  
    const problem = problemData.problems;
    const timelimit = quizData.timeLimit; // get the timelimit value from quizData

    // console.log(timelimit);
  
    navigate('/quizquestions', { 
      state: { 
        problem,
        timelimit, // add the timelimit value to the state object
      }
    });
  };
  



  return (
    <div className="quiz-selection-page">
      <h1>Quiz Selection Page</h1>

      <InputLabel id="quiz-type-label">Select quiz type</InputLabel>
      <Select className="quiz-list" labelId="quiz-type-label" onChange={handleQuizSelection}>
        {quizzes.map((quiz) => (
          <MenuItem key={quiz.id} value={quiz.id}>
            <Link to={`/quiz/${quiz.id}`} className="quiz-link">
              <h2 className="quiz-name">Quiz name: {quiz.name}</h2>
              <div className="quiz-details">
                <p className="quiz-description">Quiz Description: {quiz.description}</p>
                <p className="quiz-time">Quiz Time limit: {quiz.timeLimit} Seconds Per Question</p>
              </div>
            </Link>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Playquiz;
