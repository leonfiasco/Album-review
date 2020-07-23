import React, {useState, useContext} from 'react'
import UserContext from '../../context/UserContext';
import Axios from 'axios'

function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [displayName, setDisplayName] = useState();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, passwordConfirmation, displayName };
        const signupRes = await Axios.post('http://localhost:2402/users/signup',
        newUser
        )
    }

    return (
        <div className='page'>
           <h2>Register</h2>
           <form>
               <label htmlFor='signup-email'>Email</label>
               <input id='signup-email' type='email' onChange={e => setEmail(e.target.value)}></input>
               
               <label htmlFor='signup-password'>Password</label>
               <input id='signup-password' type='password' onChange={e => setPassword(e.target.value)}></input>
               <input type='password' placeholder='Repeat Passoword' onChange={e => setPasswordConfirmation(e.target.value)}></input>

               <label htmlFor='signup-display-name'>Display name</label>
               <input id='signup-display-name' type='text' onChange={e => setDisplayName(e.target.value)}></input>

               <button type='submit' value='Signup'></button>
           </form>
        </div>
    )
}

export default Register
