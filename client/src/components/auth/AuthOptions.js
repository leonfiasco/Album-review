import React,{ useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext)

    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login'); 
    const view = () => history.push('/albums'); 
    const add = () => history.push('/add-album');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        history.push("/")
    }

    return (
        <nav className='auth-options'>
        {
            userData.user ? (
                <>
                <button onClick={logout}>Logout</button>
                <button onClick={view}>View Albums</button>
                <button onClick={add}>Add Albums</button>
                </>
            ) : (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Log in</button>
                </>
            )
        }

        </nav>
    )
}

export default AuthOptions
