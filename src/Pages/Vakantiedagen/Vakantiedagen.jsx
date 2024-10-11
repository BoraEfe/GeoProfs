import './Vakantiedagen.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../context/User';
const Vakantiedagen = () => {
    const { user } = useUser();
  
    const [VakantieBeginData, setVakantieBeginData] = useState ('');
    const [VakantieEindData, setVakantieEindData] = useState ('');
    const [VakantieOpmerking, setVakantieopmerking] = useState ('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const today = new Date().toISOString().split('T')[0];
   
    useEffect(() => {
        if (user) {
            // Fetch leave requests for the current user
            const fetchData = async () => {
                try {
                    const usersRef = collection(db, 'vakantieaanvragen');
                    const q = query(usersRef, where('uuid', '==', sessionStorage.getItem('uuid')));
                    const querySnapshot = await getDocs(q);
                    const aanvragen = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()  // This includes all fields such as beginDatum, eindDatum, reden, and isApproved
                    }));
                    setVakantieaanvragen(aanvragen);
                } catch (error) {
                    console.error('Error fetching leave requests: ', error);
                }
            };

            fetchData();
        }
    }, [user, isSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (sessionStorage.getItem('uuid')) {
            try {
                // Add a new document to the Firestore collection "Vakantieaanvragen"
                await addDoc(collection(db, 'Vakantieaanvragen'), {
                    uuid: sessionStorage.getItem('uuid'), // The current user's UUID
                    medewerker: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                    beginDatum: VakantieBeginData,
                    eindDatum: VakantieEindData,
                    opmerking: VakantieOpmerking,
                    isApproved: false, // New requests are not approved by default
                    timestamp: today
                });
                console.log('Leave request successfully submitted!');
                setVakantieBeginData('');
                setVakantieEindData('');
                setVakantieopmerking('');
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

    return(
        <> 
        <div className='vakantieaanvraag-container'>
          <div className='vakantieaanvraag-form'>
              <form onSubmit={handleSubmit}>
                  <p>Van datum</p>
                  <input 
                      type='date' 
                      value={VakantieBeginData}
                      onChange={(e) => setVakantieBeginData(e.target.value)}
                      min={VakantieBeginData || today}
                      required>                      

                  </input>
                  <p>Tot datum</p>
                  <input 
                      type='date'
                      value={VakantieEindData}
                      onChange={(e) => setVakantieEindData(e.target.value)}
                      min={VakantieBeginData || today}
                      required>
                  </input>
                  <p>Reden</p>
                  <textarea
                  placeholder='opmerkingen'
                  style={{ height: '15vh' }}
                  maxLength={500}
                  onChange={(e) => setVakantieopmerking(e.target.value)}
                  value={VakantieOpmerking}
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
                            Vakantieaanvraag succesvol ingediend!
                        </p>
                    )}
          </div>
        </div>
    </>  
    )
}

export default Vakantiedagen;