import './Verlofaanvraag.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';


const Verlofaanvraag = () => {
    const [verlofBeginData, setVerlofBeginData] = useState('');
    const [verlofEindData, setVerlofEindData] = useState('');
    const [reden, setReden] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [verlofaanvragen, setVerlofaanvragen] = useState([]); 

    const auth = getAuth();
    const user = auth.currentUser; 
    console.log(user + " user");
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (user) {
            // Haal verlofaanvragen op voor de huidige gebruiker
            const fetchData = async () => {
                try {
                  const usersRef = collection(db, 'users');
                    const q = query(usersRef, where('uuid', '==', user.uuid) 
                    );
                    const querySnapshot = await getDocs(q);
                    const aanvragen = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setVerlofaanvragen(aanvragen); // Zet de opgehaalde data in de state
                } catch (error) {
                    console.error('Fout bij het ophalen van verlofaanvragen: ', error);
                }
            };

            fetchData(); // Roep de functie aan wanneer de component wordt geladen
        }
    }, [user, isSubmitted]); // Voeg `isSubmitted` toe om opnieuw te laden na het indienen

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            try {
                // Voeg een document toe aan de Firestore-collectie "verlofaanvragen" met de uid van de gebruiker
                await addDoc(collection(db, 'verlofaanvragen'), {
                    uuid: user.uuid, // Voeg de uid van de ingelogde gebruiker toe
                    beginDatum: verlofBeginData,
                    eindDatum: verlofEindData,
                    reden: reden,
                    timestamp: new Date() // Voeg een timestamp toe voor sorteren of administratieve doeleinden
                });
                console.log('Verlofaanvraag succesvol opgeslagen!');
                setVerlofBeginData('');
                setVerlofEindData('');
                setReden('');
                setIsSubmitted(true);

                setTimeout(() => {
                    setIsSubmitted(false); // Verberg de bevestiging na een paar seconden
                }, 3000);
            } catch (error) {
                console.error('Error met het toevoegen van de verlofaanvraag: ', error);
            }
        } else {
            console.log("Geen gebruiker ingelogd");
            console.log(user);
        }
    };

    return (
        <>
            <div className='verlofaanvraag-container'>
                <div className='verlofaanvraag-form'>
                    <form onSubmit={handleSubmit}>
                        <p>Van datum</p>
                        <input 
                            type='date' 
                            value={verlofBeginData}
                            onChange={(e) => setVerlofBeginData(e.target.value)} // Update de begin datum
                            min={today} // Zorgt ervoor dat de gebruiker geen datum in het verleden kan kiezen
                            required>                        
                        </input>
                        <p>Tot datum</p>
                        <input 
                            type='date' 
                            value={verlofEindData}
                            onChange={(e) => setVerlofEindData(e.target.value)} // Update de eind datum
                            min={verlofBeginData || today} // Einddatum mag niet voor de begin datum liggen
                            required>
                        </input>
                        <p>Reden</p>
                        <textarea
                            placeholder='Reden van verlof'
                            style={{ height: '15vh' }}
                            maxLength={500}
                            value={reden}
                            onChange={(e) => setReden(e.target.value)} // Update de reden van verlof
                        >
                        </textarea>
                        <button 
                            className='submit-button' 
                            type='submit'>
                            Verstuur
                        </button>
                    </form>
                    {isSubmitted && (
                        <p style={{ color: 'green', marginTop: '20px' }}>
                            Verlofaanvraag succesvol ingediend!
                        </p>
                    )}
                </div>

                <div className='pending-container'> 
                    <div className="pending-header">
                        <div className="check-name"></div>
                        <div className="van-name">Van</div>
                        <div className="tot-name">Tot</div>
                        <div className="opmerking-name">Opmerking</div>
                    </div>
                    <div className="line-header"></div>

                    {/* Weergeven van opgehaalde verlofaanvragen */}
                    <div className="pending-main">
                        {verlofaanvragen.length > 0 ? (
                            verlofaanvragen.map((aanvraag) => (
                                <div key={aanvraag.id} className="aanvraag-item">
                                    <div className="check"></div>
                                    <div className="van">{aanvraag.beginDatum}</div>
                                    <div className="tot">{aanvraag.eindDatum}</div>
                                    <div className="opmerking">{aanvraag.reden}</div>
                                </div>
                            ))
                        ) : (
                            <p>Geen verlofaanvragen gevonden.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Verlofaanvraag;
