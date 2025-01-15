import React, { useState } from 'react';
import styles from './VerlofInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { collection, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const VerlofInfo = ({ aanvraag, aanvraagId, onClose }) => {
    const [leaveNote, setLeaveNote] = useState('');
    const role = sessionStorage.getItem('role');
    console.log('role:', role);

    async function moveLeaveRequest(aanvraag, collectionName, isApproved = false) {
        console.log('aanvraag id:', aanvraagId);
        try {
            if (!aanvraag || !aanvraagId) {
                console.error('Aanvraag object of id ontbreekt.');
                return;
            }

            const oldLeaveRequestRef = doc(db, 'Aanvragen', aanvraagId);
            const docSnap = await getDoc(oldLeaveRequestRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                data.leaveNote = leaveNote;
                data.isApproved = isApproved; // Stel isApproved in

                const newLeaveRequestRef = doc(collection(db, collectionName));
                await setDoc(newLeaveRequestRef, data);
                await deleteDoc(oldLeaveRequestRef);
            } else {
                console.log('No such document');
            }
        } catch (error) {
            console.error('Fout bij het verplaatsen van de verlofaanvraag: ', error);
        }
    }

    if (!aanvraag) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.verlofDetails}>
                <button onClick={onClose} className={styles.closeButton}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <h2 className={styles.username}>
                    details van <strong>{aanvraag.medewerker}</strong>
                </h2>
                <p>
                    aangevraagd op: <strong>{new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString()}</strong>
                </p>
                <p>
                    Van: <strong>{aanvraag.beginDatum}</strong>
                </p>
                <p>
                    Tot: <strong>{aanvraag.eindDatum}</strong>
                </p>
                <p>
                    status: <strong>{!aanvraag.isApproved ? 'openstaand' : 'goedgekeurd'}</strong>
                </p>
                <p>
                    Reden: <strong>{aanvraag.reden}</strong>
                </p>

                {role !== '4' && (
                    <>
                        <textarea
                            placeholder="Opmerking"
                            style={{ height: '15vh' }}
                            maxLength={500}
                            value={leaveNote}
                            onChange={(e) => setLeaveNote(e.target.value)}
                        />
                        <div className={styles.buttons}>
                            <button
                                onClick={async () => {
                                    try {
                                        await moveLeaveRequest(aanvraag.uuid, 'goedgekeurdeAanvragen', true);
                                        window.location.reload();
                                    } catch (error) {
                                        console.error('Fout bij goedkeuren van de verlofaanvraag: ', error);
                                    }
                                }}
                                className={styles.approveButton}
                            >
                                Goedkeuren
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await moveLeaveRequest(aanvraag.uuid, 'afgekeurdeAanvragen', false);
                                        window.location.reload();
                                    } catch (error) {
                                        console.error('Fout bij afkeuren van de verlofaanvraag: ', error);
                                    }
                                }}
                                className={styles.rejectButton}
                            >
                                Afkeuren
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerlofInfo;
