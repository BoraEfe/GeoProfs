import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { collection, getDoc, setDoc } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const VerlofInfo = ({aanvraag, aanvraagId, onClose}) => {
    const [reden, setReden] = useState('');

    async function moveLeaveRequest (aanvraag, collectionName){
        console.log('aanvraag id:', aanvraagId);
        try{
            if (!aanvraag || !aanvraagId) { 
                console.error("Aanvraag object of id ontbreekt.");
                return; 
            }
            
            const oldLeaveRequestRef = doc(db, 'Aanvragen', aanvraagId);
            const docSnap = await getDoc(oldLeaveRequestRef);

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
            <div className=''>
                <button 
                 onClick={onClose}
                 className=''>
                <FontAwesomeIcon icon={faX}/></button>
                <h2 className='' >details van <strong>{aanvraag.medewerker}</strong></h2>
                <p>aangevraagd op:<strong> {new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString()}</strong></p>
                <p>Van: <strong>{aanvraag.beginDatum}</strong></p>
                <p>Tot: <strong>{aanvraag.eindDatum}</strong></p>
                <p>status: <strong>{aanvraag.isApproved ? `Voltooid` : `error` }</strong></p>
                <p>Reden: <strong>{aanvraag.reden}</strong></p>
                <p>opmerking:<strong>{aanvraag.opmerking}</strong></p>
                <div className={styles.buttons}>
                    <button 
                    onClick={async () => {
                        try{
                            await moveLeaveRequest(aanvraag.uuid, 'afgekeurdeAanvragen') 
                            window.location.reload();
                        }
                        catch(error){
                            console.error('Error rejecting leave request: ', error);
                        }
                    }}          
                    className={styles.rejectButton}
                    >Afkeuren </button>
                </div>
            </div>
    )
}

export default VerlofInfo;