import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Home() {
    const { userData } = useContext(UserContext);

    
    return (
        <div>
            Home
        </div>
    )
}

export default Home
