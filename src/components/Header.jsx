import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {

    // const navigate = useNavigate();

    // const navigateSetQuiz = () => {
    //     navigate('/setquiz');
    // }

    // const navigatePlayQuiz = () => {
    //     navigate('/playquiz');
    // }

    return (
        <div className="header">
            <h1>Quiz Hub</h1>
            <hr />

            <Link to="/setquiz">
                <Button sx={{ m: 20 }} variant="contained">
                    Set Quiz
                </Button>
            </Link>
            <Link to="/playquiz">
                <Button sx={{ m: 5 }} variant="contained">
                    Play Quiz
                </Button>
            </Link>
        </div>
    )
}

export default Header