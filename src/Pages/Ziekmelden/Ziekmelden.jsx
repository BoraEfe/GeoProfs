import './Ziekmelden.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../functions/context/User';
import cancelPageSwitchWhenNotLoggedIn from '../../functions/CancelPageSwitchWhenNotLoggedIn/cancelPageSwitchWhenNotLoggedIn';

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');   
    return `${year}-${month}-${day}`;
};

const Ziekmelden = () => {
    const { user } = useUser();
    const [ziekmeldenBeginData, setZiekmeldenBeginData] = useState('');
    const [ziekmeldenEindData, setZiekmeldenEindData] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    useEffect(() =>{
        cancelPageSwitchWhenNotLoggedIn();
    }, []);

    const getMaxEindDatum = (beginDatum) => {
        const beginDateObj = new Date(beginDatum);
        beginDateObj.setDate(beginDateObj.getDate() + 14);
        const year = beginDateObj.getFullYear();
        const month = String(beginDateObj.getMonth() + 1).padStart(2, '0');
        const day = String(beginDateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleZiekmelding = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'verlofaanvraag'), {
                medewerker: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                uuid: sessionStorage.getItem('uuid'),
                aanvraagDatum: getTodayDate() + ' Tijdstip: ' + getCurrentTime(),
                beginDatum: ziekmeldenBeginData,
                eindDatum: ziekmeldenEindData,
                typeVerlof: 'ziekmelding'
            });
            setConfirmation('Ziekmelding verstuurd!');
            setZiekmeldenBeginData('');
            setZiekmeldenEindData('');
            setTimeout(() => {
                setConfirmation(null);
            }, 10000);
        } catch (error) {
            setConfirmation(`Er ging iets mis: ${error.message}`);
        }
    };

    return (
        <>
            <div className='ziekmelden-container'>
                {confirmation && <p className="confirmation-message">{confirmation}</p>}
                <h1>Ziekmelden</h1>
                <div className='ziekmelden-form'>
                    <form onSubmit={handleZiekmelding}>
                        <div className="data">
                            <p>Begindatum</p>
                            <input 
                                type='date' 
                                value={ziekmeldenBeginData}
                                min={getTodayDate()}
                                onChange={(e) => setZiekmeldenBeginData(e.target.value)}
                                required>
                            </input>
                            <p>Verwachte einddatum</p>
                            <input 
                                type='date' 
                                value={ziekmeldenEindData}
                                min={ziekmeldenBeginData || getTodayDate()}
                                max={ziekmeldenBeginData ? getMaxEindDatum(ziekmeldenBeginData) : ''}
                                onChange={(e) => setZiekmeldenEindData(e.target.value)}
                                required>
                            </input>
                        </div>
                        <button 
                            className='submit-button' 
                            type='submit'>
                            Verstuur
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Ziekmelden;
