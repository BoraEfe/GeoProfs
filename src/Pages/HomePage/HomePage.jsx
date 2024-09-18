    import './HomePage.css';
    import Agenda from '../../Components/Agenda/Agenda';
    import { useNavigate } from 'react-router-dom';
    import { useEffect } from 'react';


    const HomePage = () => {
        const navigate = useNavigate();

        useEffect (() => {
            const loggedIn = localStorage.getItem('isLoggedIn');
            const username = localStorage.getItem('username')
            if (!loggedIn){
                navigate('/Login')
            }
            else{
                navigate('/')
                console.log('Login success')
            }
        }, [navigate])

        return (
            <main>
                <div className="homepage-container-1">
                    <button onClick={(e) => {navigate('/ziekmelden')}}>
                        Ziekmelden
                    </button>
                    <button onClick={(e) => {navigate('/vakantie-dagen')}}>
                        Vakantiedagen opnemen
                    </button>
                    <button onClick={(e) => {navigate('/verlof')}}>
                        Verlof aanvragen
                    </button>
                </div>
                <div className='homepage-container-2'>
                    <h1 className='welkom-title'>
                        Welkom, {localStorage.getItem('username')}
                    </h1>
                </div>
                <div className='homepage-container-3'>
                    <Agenda/>
                </div>
            </main>
        );
    };

    export default HomePage;
