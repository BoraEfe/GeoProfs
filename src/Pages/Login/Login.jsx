import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '../../context/User';
import { hashPasswordWithSalt } from '../../components/HashPassword';
import CheckForFirstLogin from '../../components/CheckForFirstLogin/CheckForFirstLogin';
    
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
                    
                    const hashedInputPassword = hashPasswordWithSalt(password);

                    console.log(hashedInputPassword);
                    console.log(user.wachtwoord);

                    if ((hashedInputPassword.hashedPassword === user.tijdelijkWachtwoord && user.wachtwoord === null)||
                       ( hashedInputPassword.hashedPassword === user.wachtwoord && user.tijdelijkWachtwoord === null)){
                        isLoggedIn = true;
                        console.log('login success'); 
                        CheckForFirstLogin(user);
                        
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
                        setError('Wachtwoord is onjuist');
                        console.log(error);
                    }
                })
            }else{
                setError('Gebruiker niet gevonden');
                console.log(error);
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