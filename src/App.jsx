import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Playquiz from './pages/Playquiz/Playquiz'
import Setquiz from './pages/Setquiz/Setquiz'
import Questionspage from './pages/Questionspage/Questionspage'
import Result from './pages/Result/Result'

const App = () => {
  return (
    <div className="app">
        <Routes>
            <Route exact path='/' element={<Header/>}/>
            <Route exact path='/setquiz' element={<Setquiz/>}/>
            <Route exact path='/playquiz' element={<Playquiz/>}/>
            <Route exact path='/quizquestions' element={<Questionspage/>}/>
            <Route exact path='/result' element={<Result/>}/>
        </Routes>
    </div>
  )
}

export default App