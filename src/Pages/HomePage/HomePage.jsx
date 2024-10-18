import './HomePage.css';
import Agenda from '../../Components/Agenda/Agenda';
import { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import cancelPageSwitchWhenNotLoggedIn from '../../Components/cancelPageSwitchWhenNotLoggedIn';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/User';

const HomePage = () => {    
    const { user } = useUser(); // user context
    const navigate = useNavigate();
    const [vakantiedagen, setVakantiedagen] = useState(null); // state to store vakantiedagen

    useEffect(() => {    
        cancelPageSwitchWhenNotLoggedIn();
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
                    <p>Aantal vakantiedagen: {vakantiedagen}</p>
                </div>
            </div>
            <div className='homepage-container-2'>
                <h1 className='welkom-title'>
                    Welkom, {sessionStorage.getItem('firstname')} {sessionStorage.getItem('lastname')}
                </h1>
            </div>
            <div className='homepage-container-3'>
                <Agenda/>
            </div>
        </main>
    );
};

export default HomePage;