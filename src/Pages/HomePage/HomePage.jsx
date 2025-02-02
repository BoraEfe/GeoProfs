import './HomePage.css';
import Agenda from '../../Components/Agenda/Agenda';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import cancelPageSwitchWhenNotLoggedIn from '../../functions/CancelPageSwitchWhenNotLoggedIn/cancelPageSwitchWhenNotLoggedIn';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../functions/context/User';
import CheckForFirstLogin from '../../functions/CheckForFirstLogin/CheckForFirstLogin';

const HomePage = () => {    
    const { user } = useUser();
    const navigate = useNavigate();
    const [vakantiedagen, setVakantiedagen] = useState(null);

    useEffect(() => {    
        cancelPageSwitchWhenNotLoggedIn();
        CheckForFirstLogin(user);
    }, []);

    useEffect(() => {
        console.log(user)
        console.log(sessionStorage)
    }, [user]);

    useEffect(() => {
        const fetchVakantiedagen = async () => {

            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('uuid', '==', sessionStorage.getItem('uuid')));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {

                    const data = doc.data();
                    setVakantiedagen(data.vakantiedagen);
                });
            } catch (error) {
                console.error("Error fetching vakantiedagen: ", error);
            }
        };

        fetchVakantiedagen();
    }, [user]);

    console.log("VAKANTIEDAGEN: ", {vakantiedagen});
    
    return (
        <main>
            <div className="homepage-container-1">
                <button onClick={() => {navigate('/verlofaanvraag')}} data-testid='verlof-aanvraag-button'>
                    Verlof aanvragen
                </button>
                <button onClick={() => {navigate('/Ziekmelden')}} data-testid='ziekmelding-aanvraag-button'>
                    Ziekmelden
                </button>
                <div className='vakantiedagen'>
                    <p>Aantal vakantiedagen: {vakantiedagen}</p>
                </div>
                <button onClick={() => {navigate('/aanvragengeschiedenis')}} data-testid='alle-aanvragen-button'>
                    Alle aanvragen
                </button>
            </div>
            <div className='homepage-container-2'>
                <h1 className='welkom-title' data-testid='homepage-title'>
                    Welkom, {sessionStorage.getItem('firstname')}
                </h1>
            </div>
            <div className='homepage-container-3'>
                <Agenda/>
            </div>
        </main>
    );
};

export default HomePage;
