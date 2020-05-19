import React from 'react'
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';


function Header() {
    return (
        <div id='header'>
           <Link to='/'><h1 className='title'>Album-Review</h1></Link>
           <AuthOptions></AuthOptions>
        </div>
    )
}

export default Header
