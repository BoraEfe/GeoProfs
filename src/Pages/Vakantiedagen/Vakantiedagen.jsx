import './Vakantiedagen.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../../context/User';

const Vakantiedagen = () => {
    
    const { user } = useUser();
<<<<<<< HEAD
    const [verkantieBeginData, setVerkantieBeginData] = useState ('');
    const [verkantieEindData, setVerkantieEindData] = useState ('');
    const [verkantieOpmerking, setVerkantieopmerking] = useState ('');
=======
  
    const [VakantieBeginData, setVakantieBeginData] = useState ('');
    const [VakantieEindData, setVakantieEindData] = useState ('');
    const [VakantieOpmerking, setVakantieopmerking] = useState ('');
>>>>>>> fcca7f6b1ab8eebe0b1944a66818dd5fa21fc104
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [vakantieaanvragen, setVakantieaanvragen] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    console.log( vakantieaanvragen.length);
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
<<<<<<< HEAD
                try {   
                    const usersRef = collection(db, 'verkantieaanvragen');
                    const q = query(usersRef, where('uuid', '==', user.uuid));
=======
                try {
                    const usersRef = collection(db, 'vakantieaanvragen');
                    const q = query(usersRef, where('uuid', '==', sessionStorage.getItem('uuid')));
>>>>>>> fcca7f6b1ab8eebe0b1944a66818dd5fa21fc104
                    const querySnapshot = await getDocs(q);
                    const aanvragen = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()  
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
                await addDoc(collection(db, 'vakantieaanvragen'), {
                    uuid: sessionStorage.getItem('uuid'), 
                    medewerker: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                    beginDatum: VakantieBeginData,
                    eindDatum: VakantieEindData,
                    opmerking: VakantieOpmerking,
                    isApproved: false, 
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
          <div className='pending-container'>
                    <div className="pending-header">
                        <div className="van-name">Van</div>
                        <div className="tot-name">Tot</div>
                        <div className="opmerking-name">Opmerking</div>
                        <div className="status-name">Status</div> 
                    </div>
                    <div className="line-header"></div>

                    <div className="pending-main">
                        {vakantieaanvragen.length > 0 ? (
                            vakantieaanvragen.map((aanvraag) => (
                                <div key={aanvraag.id} className="aanvraag-item">
                                    <div className="van">{aanvraag.beginDatum}</div>
                                    <div className="tot">{aanvraag.eindDatum}</div>
                                    <div className="opmerking">{aanvraag.opmerking}</div>
                                    <div className="status">
                                        {aanvraag.isApproved ? 'Approved' : 'Pending'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            
                            <p>Geen vakantie aanvragen gevonden.</p>
                        )}
                    </div>
                </div>
        </div>
    </>  
    )
}

export default Vakantiedagen;