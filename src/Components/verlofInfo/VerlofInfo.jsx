import React, {useState} from 'react';
import './VerlofInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { collection, getDoc, setDoc } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
const VerlofInfo = ({aanvraag, onClose}) => {
    const [reden, setReden] = useState('');

    async function moveLeaveRequest (aanvraag, collectionName){
        try{
            if (!aanvraag || !aanvraag.id) { // Controleer of aanvraag en aanvraag.id bestaan
                console.error("Aanvraag object of id ontbreekt.");
                return; // Stop de functie als er geen aanvraag of id is
            }
            
            const oldLeaveRequestRef = doc(db, 'Aanvragen', aanvraag.id);
            const docSnap = await getDoc(oldLeaveRequestRef);
            console.log(aanvraag.id);

            if(docSnap.exists()){
                const data = docSnap.data();
                const newLeaveRequestRef = doc(collection(db, collectionName)); 
                await setDoc(newLeaveRequestRef, data);
                await deleteDoc(oldLeaveRequestRef);	
            }
            else if(!docSnap.exists()){
                console.log('No such document');
            }
        }
        catch(error){
            console.error('Error moving leave request: ', error);
        }
    }

    if(!aanvraag) return null;

    return(
            <div className="verlof-details">
                <button 
                 onClick={onClose}
                 className='x'>
                <FontAwesomeIcon icon={faX}/></button>
                <h3>details van <strong>{aanvraag.medewerker}</strong></h3>
                <p>aangevraagd op:<strong> {new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString()}</strong></p>
                <p>Van: <strong>{aanvraag.beginDatum}</strong></p>
                <p>Tot: <strong>{aanvraag.eindDatum}</strong></p>
                <p>status: <strong>{!aanvraag.isApproved ? `openstaand` : `error` }</strong></p>
                <p>Reden: <strong>{aanvraag.reden}</strong></p>

                <textarea
                    placeholder='Opmerking'
                    style={{ height: '15vh' }}
                    maxLength={500}
                    value={reden}
                    onChange={(e) => setReden(e.target.value)}
                />
                <br/>
                <button
                 onClick={() => moveLeaveRequest(aanvraag.uuid, 'goedgekeurdeAanvragen') }
                 className='approve-button'
                 >Goedkeuren
                </button>
                <button 
                 onClick={() => moveLeaveRequest(aanvraag.uuid, 'afgekeurdeAanvragen') }
                 className='reject-button'
                >Afkeuren </button>
            </div>
    )
}

export default VerlofInfo;