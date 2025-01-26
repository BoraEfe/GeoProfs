import './Ziekmelden.css';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../functions/context/User';

const Ziekmelden = () => {
    const { user } = useUser();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const today = new Date().toISOString().split('T')[0];
    const uuid = sessionStorage.getItem('uuid');
    const department = sessionStorage.getItem('department');

    const handleSickLeave = async () => {
        if (!uuid) {
            console.error("Geen uuid gevonden. Gebruiker is niet ingelogd.");
            return;
        }

        try {
            await addDoc(collection(db, 'goedgekeurdeAanvragen'), {
                uuid: uuid,
                medewerker: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                beginDatum: today,
                eindDatum: today,
                aantalDagen: 1,
                reden: 'Ziekmelding',
                isApproved: true,
                typeVerlof: 'Ziekteverlof',
                timestamp: new Date(),
                departement: department,
            });

            console.log('Ziekmelding succesvol ingediend!');
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('Fout bij het indienen van ziekmelding: ', error);
        }
    };

    return (
        <div className="container-main">
            {isSubmitted && (
                <p style={{ color: 'green', marginTop: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
                Ziekmelding succesvol ingediend!
                </p>
            )}
            <h1 data-testid='ziekmelding-title'>Ziekmelden</h1>
            <div className="ziekmelden-container">
                <div className="ziekmelden-form">
                    <p>
                        Let op, u kunt zich alleen ziekmelden voor vandaag en dient dit dus morgen opnieuw te doen wanneer u nog steeds ziek bent.
                    </p>
                    <button className="submit-button" onClick={handleSickLeave} data-testid='ziekmelding-button'>
                        Ziekmelden
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ziekmelden;
