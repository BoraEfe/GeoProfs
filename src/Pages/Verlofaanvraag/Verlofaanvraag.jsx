import './Verlofaanvraag.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../functions/context/User';


const Verlofaanvraag = () => {
    const { user } = useUser();
    const [verlofBeginData, setVerlofBeginData] = useState('');
    const [verlofEindData, setVerlofEindData] = useState('');
    const [reden, setReden] = useState('');
    const [soortVerlof, setSoortVerlof] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [verlofaanvragen, setVerlofaanvragen] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);

    const today = new Date().toISOString().split('T')[0];

    const uuid = sessionStorage.getItem('uuid')

    console.log( verlofaanvragen.length);

    useEffect(() => {
        const fetchLeaveTypes = async () => {
            const leaveTypesRef = collection(db, "typeVerlof");
            const leaveTypesSnapshot = await getDocs(leaveTypesRef);
            const leaveNames = leaveTypesSnapshot.docs.map(doc => doc.data().name);
            setLeaveTypes(leaveNames);
        };
        fetchLeaveTypes();
    }, []); 
    
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const usersRef = collection(db, 'aanvragen');
                    const q = query(usersRef, where('uuid', '==', uuid));
                    const querySnapshot = await getDocs(q);
                    const aanvragen = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name || 'Geen naam',
                        ...doc.data() 
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

        if (uuid && soortVerlof.length > 0) {
            try {
                await addDoc(collection(db, 'Aanvragen'), {
                    uuid: uuid, 
                    medewerker: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                    beginDatum: verlofBeginData,
                    eindDatum: verlofEindData,
                    reden: reden,
                    isApproved: false, 
                    typeVerlof: soortVerlof,
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
        } else if(soortVerlof.length === 0) {
            console.log("No type of leave selected");
        } else if(!uuid){
            console.log("No uuid found");
        }
    };
    console.log('Fetched leave types:', leaveTypes);
    return (
        <>
            <div className='verlofaanvraag-container'>
            {isSubmitted && (
                        <p style={{ color: 'white', marginTop: '20px' }}>
                            Verlofaanvraag succesvol ingediend!
                        </p>
                    )}
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
                        <p>Reden van verlof</p>
                            <select 
                            name ="verlof"
                            onChange={(e) => setSoortVerlof(e.target.value)}
                            required
                            >
                                <option value="" disabled selected>Selecteer uw keuze</option>
                                {leaveTypes.length > 0 ? (
                                    leaveTypes.map((name, index) => (
                                        <option key={index} value={name}>
                                        {name}
                                        </option>
                                        )
                                    )
                                ) : (
                                    <option value="" disabled>
                                        Loading...
                                    </option>
                                )}
                            </select>
                        <p>aanvulling</p>
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
                </div>

                <div className='pending-container'>
                    <div className="pending-header">
                        <div className="van-name">Van</div>
                        <div className="tot-name">Tot</div>
                        <div className="opmerking-name">Opmerking</div>
                        <div className="status-name">Status</div> 
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
