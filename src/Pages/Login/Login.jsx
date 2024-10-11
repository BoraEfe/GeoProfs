import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '../../context/User';
    
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const {setUser} = useUser();
    var isLoggedIn;

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

                    if (user.tijdelijkwachtwoord === password){
                        isLoggedIn = true;
                        console.log('login success'); 
                        
                        sessionStorage.setItem('firstname', user.voornaam)
                        sessionStorage.setItem('lastname', user.achternaam)
                        sessionStorage.setItem('email', user.email)
                        sessionStorage.setItem('role', user.role)
                        sessionStorage.setItem('function', user.functie)
                        sessionStorage.setItem('department', user.departement)
                        sessionStorage.setItem('uuid', user.uuid)

                        setUser({
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            vakantiedagen: user.vakantiedagen,
                            email: user.email,
                            role: user.role,
                            uuid: user.uuid,
                            isLoggedIn: true,
                        })
                        console.log(user);
                        sessionStorage.setItem('isLoggedIn', true);
                        console.log(isLoggedIn);
                        navigate('/');
                    }else {
                        console.log('Login is mislukt');
                    }
                })
            }else{
                setError('Gebruiker niet gevonden');
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