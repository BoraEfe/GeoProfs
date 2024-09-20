import './HomePage.css';
import Agenda from '../../Components/Agenda/Agenda';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';

    const HomePage = () => {
        const navigate = useNavigate();
        const [vakantieDagen, setVakantieDagen] = useState();
        const email = localStorage.getItem('email');

        useEffect (() => {
            const loggedIn = localStorage.getItem('isLoggedIn');
            if (!loggedIn){
                navigate('/Login')
            }
            else{
                navigate('/')
                console.log('Login success')
            }
        }, [navigate])
        useEffect(() => {
            const fetchVakantieDagen = async () => {
                try {
                    const usersRef = collection(db, 'users');
                    const q = query(usersRef, where('email', '==', email));
                    const querySnapshot = await getDocs(q);
    
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0].data(); 
                        setVakantieDagen(userDoc.vakantiedagen);
                    } else {
                        console.error('Gebruiker niet gevonden');
                    }
                } catch (error) {
                    console.error('Error bij het ophalen van vakantiedagen: ', error);
                }
            };
    
            fetchVakantieDagen();
        }, [email]);

        return (
            <main>
                <div className="homepage-container-1">
                    <button onClick={() => {navigate('/ziekmelden')}}>
                        Ziekmelden
                    </button>
                    <button onClick={() => {navigate('/vakantie-dagen')}}>
                        Vakantiedagen opnemen
                    </button>
                    <button onClick={() => {navigate('/verlof')}}>
                        Verlof aanvragen
                    </button>
                    <div className='vakantiedagen'>
                        {vakantieDagen !== null ? (
                             `Aantal vakantiedagen: ${vakantieDagen}`
                        ) : (
                            'Vakantiedagen laden...'
                        )}

                    </div>
                </div>
                <div className='homepage-container-2'>
                    <h1 className='welkom-title'>
                        Welkom, {localStorage.getItem('firstname')}
                    </h1>
                </div>
                <div className='homepage-container-3'>
                    <Agenda/>
                </div>
            </main>
        );
    };

    export default HomePage;
    