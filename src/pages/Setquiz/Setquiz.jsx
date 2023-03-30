import React, { useState } from 'react'
import './setquiz.css'

const Setquiz = () => {

  const [quizname, setQuizname] = useState("");
  const [timelimit, setTimelimit] = useState("");

  const onSubmit = (event) =>{
    event.preventDefault();
    setQuizname('');
    setTimelimit('');
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

        <button type="submit">submit</button>
      </form>
    </div>
    </div>
  )
}

export default Setquiz;