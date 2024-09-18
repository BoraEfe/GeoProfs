import './Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    var login = false;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password);
        if (username === 'admin' && password === 'admin'){
            console.log('Login success');
            login = true;
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('username', username);
            navigate('/');
        } 
        else {
            console.log('Login failed');
            login = false;
        }

    }
    return(
        <div className='login-container'>
            <div className='login-form'>
                <h1>
                    Login
                </h1>
                <form onSubmit={handleLogin}>
                    <p>Gebruikersnaam</p>
                    <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>Wachtwoord</p>
                    <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    /> 
                    <button type="submit">
                      Login
                   </button>
                </form>
            </div>
        </div>
    )
}

export default Login;