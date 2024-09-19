import './Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
let username2

const Login = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();
    var login = false;

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try{
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty){
                querySnapshot.forEach((doc) => {
                    const user = doc.data();

                    if (user.password === password){
                        console.log('login success');
                        login = true;
                        
                        localStorage.setItem('isLoggedIn', true);
                        localStorage.setItem('username', user.username);
                        localStorage.setItem('role', user.role);
                        navigate('/');
                    }else {
                        console.log('Login is mislukt');
                        login = false;
                    }
                })
            }else{
                setError('Gebruiker niet gevonden');
                login = false;
            }
        }catch(error){
            console.log('Error getting documents:', error);
            setError('Er is iets misgegaan');
        }
    }
    return(
        <div className='login-container'>
            <div className='login-form'>
                <h1>
                    Login
                </h1>
                <form onSubmit={handleLogin}>
                    <p>Email</p>
                    <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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