import React from 'react'
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { result } = location.state;
    return (
        <div>{result}</div>
    )
}

export default Result