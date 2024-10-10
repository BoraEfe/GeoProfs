import './HomePage.css';
import Agenda from '../../Components/Agenda/Agenda';
import { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import cancelPageSwitchWhenNotLoggedIn from '../../Components/cancelPageSwitchWhenNotLoggedIn';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/User';

    const HomePage = () => {    
        const { user } = useUser();
        // if(!user.uuid){
        //     localStorage.removeItem('isLoggedIn');
        //     localStorage.removeItem('username');
        //     window.location.href = '/login';
        // }
        // else{
        const navigate = useNavigate();

        useEffect(() =>{    
            cancelPageSwitchWhenNotLoggedIn();
        }, []);


        useEffect(() => {
            console.log(user)
            console.log(sessionStorage)
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
                        Welkom, {sessionStorage.getItem('firstname')} {  sessionStorage.getItem('lastname')}
                    </h1>
                </div>
                <div className='homepage-container-3'>
                    <Agenda/>
                </div>
            </main>
        );
    };
    // }
    export default HomePage;
    