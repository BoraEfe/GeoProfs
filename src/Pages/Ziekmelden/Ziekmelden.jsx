import './Ziekmelden.css';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Ziekmelden = () => {
    const [ziekmeldenBeginData, setZiekmeldenBeginData] = useState('');
    const [ziekmeldenEindData, setZiekmeldenEindData] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');   
        return `${year}-${month}-${day}`;
    };

    const handleZiekmelding = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'ziekmeldingen'), {
                medewerker: localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
                aanvraagDatum: getTodayDate(),
                beginDatum: ziekmeldenBeginData,
                eindDatum: ziekmeldenEindData,
            });
            setConfirmation('Ziekmelding verstuurd!');
            setZiekmeldenBeginData('');
            setZiekmeldenEindData('');
            setTimeout(() => {
                setConfirmation(null);
            }, 5000);
        } catch (error) {
            setConfirmation(`Er ging iets mis: ${error.message}`);
        }
    };

    return (
        <>
            <div className='ziekmelden-container'>
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
                    {confirmation && <p className="confirmation-message">{confirmation}</p>}
            </div>
        </>
    );
}

export default Ziekmelden;