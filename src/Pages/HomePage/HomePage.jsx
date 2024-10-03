import './HomePage.css';
import Agenda from '../../Components/Agenda/Agenda';
import { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import cancelPageSwitchWhenNotLoggedIn from '../../Components/cancelPageSwitchWhenNotLoggedIn';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';

    const HomePage = () => {    
        const {user} = useUser();
        const navigate = useNavigate();

        useEffect(() =>{    
            cancelPageSwitchWhenNotLoggedIn();
        }, []);


        useEffect(() => {
            console.log(user)
        }, [user]);

        return (
            <main>
                <div className="homepage-container-1">
                    <button onClick={() => {navigate('/ziekmelden')}}>
                        Ziekmelden
                    </button>
                    <button onClick={() => {navigate('/vakantiedagen')}}>
                        Vakantiedagen opnemen
                    </button>
                    <button onClick={() => {navigate('/verlofaanvraag')}}>
                        Verlof aanvragen
                    </button>
                    <div className='vakantiedagen'>
                        
                    </div>
                </div>
                <div className='homepage-container-2'>
                    <h1 className='welkom-title'>
                        Welkom, {user.firstname} {user.lastname}
                    </h1>
                </div>
                <div className='homepage-container-3'>
                    <Agenda/>
                </div>
            </main>
        );
    };

    export default HomePage;
    