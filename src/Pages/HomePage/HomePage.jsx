import './HomePage.css';
import Agenda from '../../Components/Agenda/Agenda';

const HomePage = () => {
    return (
        <main>
            <div className="homepage-container-1">
                <button>
                    Ziekmelden
                </button>
                <button>
                    Vakantiedagen opnemen
                </button>
                <button>
                    Verlof aanvragen
                </button>
            </div>
            <div className='homepage-container-2'>
                <h1 className='welkom-title'>
                    Welkom, 
                </h1>
            </div>
            <div className='homepage-container-3'>
                <Agenda/>
            </div>
        </main>
    );
};

export default HomePage;
