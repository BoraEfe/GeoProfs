import './Verlofaanvraag.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../functions/context/User';

const Verlofaanvraag = () => {
    const [verlofBeginData, setVerlofBeginData] = useState('');
    const [verlofEindData, setVerlofEindData] = useState('');
    const [reden, setReden] = useState('');
    const [soortVerlof, setSoortVerlof] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [verlofaanvragen, setVerlofaanvragen] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [vakantieDagen, setVakantiedagen] = useState(null);

    const today = new Date().toISOString().split('T')[0];
    const uuid = sessionStorage.getItem('uuid')
    const department = sessionStorage.getItem('department')

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
        const fetchVacationDays = async () => {
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('uuid', '==', uuid));
                const querySnapshot = await getDocs(q);
    
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    setVakantiedagen(userData.vakantiedagen || 0);
                } else {
                    console.error("Geen gebruikersgegevens gevonden.");
                    setVakantiedagen(0);
                }
            } catch (error) {
                console.error("Fout bij het ophalen van vakantiedagen:", error);
            }
        };
    
        if (uuid) {
            fetchVacationDays();
        }
    }, [uuid]);

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDifference = end.getTime() - start.getTime();
    
        return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    };

    const calculateTotalLeaveDays = (startDate, endDate) => {
        const leaveDays = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const currentDate = new Date(start);

        while(currentDate <= end) {
            leaveDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return leaveDays;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uuid && soortVerlof.length > 0 && verlofBeginData && verlofEindData) {
            const requestedDays = calculateDays(verlofBeginData, verlofEindData);
            const requestedLeaveDays = calculateTotalLeaveDays(verlofBeginData, verlofEindData);

            if (requestedDays > vakantieDagen) {
                alert('U heeft niet genoeg vakantiedagen.');
                return;
            }

            try {
                await addDoc(collection(db, 'Aanvragen'), {
                    uuid: uuid, 
                    medewerker: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                    beginDatum: verlofBeginData,
                    eindDatum: verlofEindData,
                    aantalDagen: requestedLeaveDays,
                    reden: reden,
                    isApproved: null, 
                    typeVerlof: soortVerlof,
                    timestamp: new Date(),
                    departement: department
                });

                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('uuid', '==', uuid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userRef = doc(db, 'users', userDoc.id);

                    const updatedVacationDays = vakantieDagen - requestedDays;
                    await updateDoc(userRef, { vakantiedagen: updatedVacationDays });

                    setVakantiedagen(updatedVacationDays);
                }

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
        <div className='main-container'>
          <h1 data-testid='verlof-aanvraag-title'>Verlofaanvraag</h1>
            <div className='verlofaanvraag-container'>
            {isSubmitted && (
                        <p style={{ color: 'white', marginTop: '20px' }}>
                            Verlofaanvraag succesvol ingediend!
                        </p>
                    )}
                <div className='verlofaanvraag-form'>
                <p>U heeft {vakantieDagen} beschikbare vakantiedagen.</p>
                    <form onSubmit={handleSubmit}>
                        <p>Van datum</p>
                        <input 
                            data-testid='verlof-aanvraag-date-from'
                            type='date' 
                            value={verlofBeginData}
                            onChange={(e) => setVerlofBeginData(e.target.value)}
                            min={today}
                            required>
                        </input>
                        <p>Tot datum</p>
                        <input 
                            data-testid='verlof-aanvraag-date-to'
                            type='date' 
                            value={verlofEindData}
                            onChange={(e) => setVerlofEindData(e.target.value)}
                            min={verlofBeginData || today}
                            required>
                        </input>
                        <p>Reden van verlof</p>
<label htmlFor="verlofSelect">Reden van verlof</label>
<select
  id="verlofSelect"
  name="verlof"
  onChange={(e) => setSoortVerlof(e.target.value)}
  required
>
  <option value="" disabled selected>
    Selecteer uw keuze
  </option>
  {leaveTypes.length > 0 ? (
    leaveTypes.map((name, index) => (
      <option key={index} value={name}>
        {name}
      </option>
    ))
  ) : (
    <option value="" disabled>
      Loading...
    </option>
  )}
</select>
                        <p>Aanvulling</p>
                        <textarea
                            data-testid='verlof-aanvraag-textarea'
                            placeholder='Reden van verlof'
                            value={reden}
                            onChange={(e) => setReden(e.target.value)}
                        >
                        </textarea>
                        <button 
                            data-testid='submit-verlof-aanvraag'
                            className='submit-button' 
                            type='submit'>
                            Verstuur
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Verlofaanvraag;
