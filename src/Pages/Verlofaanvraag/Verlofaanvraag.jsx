import './Verlofaanvraag.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../context/User';

const Verlofaanvraag = () => {
    const { user } = useUser();
    const [verlofBeginData, setVerlofBeginData] = useState('');
    const [verlofEindData, setVerlofEindData] = useState('');
    const [reden, setReden] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [verlofaanvragen, setVerlofaanvragen] = useState([]);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (user) {
            // Fetch leave requests for the current user
            const fetchData = async () => {
                try {
                    const usersRef = collection(db, 'verlofaanvragen');
                    const q = query(usersRef, where('uuid', '==', user.uuid));
                    const querySnapshot = await getDocs(q);
                    const aanvragen = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()  // This includes all fields such as beginDatum, eindDatum, reden, and isApproved
                    }));
                    setVerlofaanvragen(aanvragen);
                } catch (error) {
                    console.error('Error fetching leave requests: ', error);
                }
            };

            fetchData();
        }
    }, [user, isSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.uuid) {
            try {
                // Add a new document to the Firestore collection "verlofaanvragen"
                await addDoc(collection(db, 'verlofaanvragen'), {
                    uuid: user.uuid, // The current user's UUID
                    medewerker: localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
                    beginDatum: verlofBeginData,
                    eindDatum: verlofEindData,
                    reden: reden,
                    isApproved: false, // New requests are not approved by default
                    timestamp: new Date()
                });
                console.log('Leave request successfully submitted!');
                setVerlofBeginData('');
                setVerlofEindData('');
                setReden('');
                setIsSubmitted(true);

                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            } catch (error) {
                console.error('Error submitting leave request: ', error);
            }
        } else {
            console.log("No user is logged in");
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
                            onChange={(e) => setVerlofBeginData(e.target.value)}
                            min={today}
                            required>
                        </input>
                        <p>Tot datum</p>
                        <input 
                            type='date' 
                            value={verlofEindData}
                            onChange={(e) => setVerlofEindData(e.target.value)}
                            min={verlofBeginData || today}
                            required>
                        </input>
                        <p>Reden</p>
                        <textarea
                            placeholder='Reden van verlof'
                            style={{ height: '15vh' }}
                            maxLength={500}
                            value={reden}
                            onChange={(e) => setReden(e.target.value)}
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
                        <div className="van-name">Van</div>
                        <div className="tot-name">Tot</div>
                        <div className="opmerking-name">Opmerking</div>
                        <div className="status-name">Status</div> {/* Add a status column */}
                    </div>
                    <div className="line-header"></div>

                    <div className="pending-main">
                        {verlofaanvragen.length > 0 ? (
                            verlofaanvragen.map((aanvraag) => (
                                <div key={aanvraag.id} className="aanvraag-item">
                                    <div className="van">{aanvraag.beginDatum}</div>
                                    <div className="tot">{aanvraag.eindDatum}</div>
                                    <div className="opmerking">{aanvraag.reden}</div>
                                    <div className="status">
                                        {aanvraag.isApproved ? 'Approved' : 'Pending'}
                                    </div>
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
