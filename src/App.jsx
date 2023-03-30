import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Playquiz from './pages/Playquiz/Playquiz'
import Setquiz from './pages/Setquiz/Setquiz'

const App = () => {
  return (
    <div className="app">
        <Routes>
            <Route exact path='/' element={<Header/>}/>
            <Route exact path='/setquiz' element={<Setquiz/>}/>
            <Route exact path='/playquiz' element={<Playquiz/>}/>
        </Routes>
    </div>
  )
}

export default App