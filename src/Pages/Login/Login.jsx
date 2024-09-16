import './Login.css';
import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className='login-container'>
            <div className='login-form'>
                <h1>
                    Login
                </h1>
                <form>
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
                </form>
                <button>
                    Login
                </button>
            </div>
            
        </div>
    )
}

export default Login;