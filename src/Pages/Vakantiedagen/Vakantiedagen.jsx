import './Vakantiedagen.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../context/User';
const Vakantiedagen = () => {
    
    const { user } = useUser();
    const [verkantieBeginData, setVerkantieBeginData] = useState ('');
    const [verkantieEindData, setVerkantieEindData] = useState ('');
    const [verkantieOpmerking, setVerkantieopmerking] = useState ('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const today = new Date().toISOString().split('T')[0];
   
    useEffect(() => {
        if (user) {
            // Fetch leave requests for the current user
            const fetchData = async () => {
                try {   
                    const usersRef = collection(db, 'verkantieaanvragen');
                    const q = query(usersRef, where('uuid', '==', user.uuid));
                    const querySnapshot = await getDocs(q);
                    const aanvragen = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()  // This includes all fields such as beginDatum, eindDatum, reden, and isApproved
                    }));
                    setVerkantieaanvragen(aanvragen);
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
                // Add a new document to the Firestore collection "verkantieaanvragen"
                await addDoc(collection(db, 'verkantieaanvragen'), {
                    uuid: user.uuid, // The current user's UUID
                    medewerker: localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
                    beginDatum: verkantieBeginData,
                    eindDatum: verkantieEindData,
                    opmerking: verkantieOpmerking,
                    isApproved: false, // New requests are not approved by default
                    timestamp: today
                });
                console.log('Leave request successfully submitted!');
                setVerkantieBeginData('');
                setVerkantieEindData('');
                setVerkantieopmerking('');
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
        <div className='verkantieaanvraag-container'>
          <div className='verkantieaanvraag-form'>
              <form onSubmit={handleSubmit}>
                  <p>Van datum</p>
                  <input 
                      type='date' 
                      value={verkantieBeginData}
                      onChange={(e) => setVerkantieBeginData(e.target.value)}
                      min={verkantieBeginData || today}
                      required>                      

                  </input>
                  <p>Tot datum</p>
                  <input 
                      type='date'
                      value={verkantieEindData}
                      onChange={(e) => setVerkantieEindData(e.target.value)}
                      min={verkantieBeginData || today}
                      required>
                  </input>
                  <p>Reden</p>
                  <textarea
                  placeholder='opmerkingen'
                  style={{ height: '15vh' }}
                  maxLength={500}
                  onChange={(e) => setVerkantieopmerking(e.target.value)}
                  value={verkantieOpmerking}
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
                            Verkantieaanvraag succesvol ingediend!
                        </p>
                    )}
          </div>
        </div>
    </>  
    )
}

export default Vakantiedagen;