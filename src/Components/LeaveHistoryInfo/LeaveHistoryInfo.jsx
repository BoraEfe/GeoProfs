import React, {useState} from 'react';
import './LeaveHistoryInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { collection, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const LeaveHistoryInfo = ({ aanvraag, aanvraagId, onClose }) => {
    const role = sessionStorage.getItem('role');
    console.log('role:', role);

    if (!aanvraag) return null;

    return (
        <div className="overlay">
            <div className="verlofAanvraagDetails">
                <button onClick={onClose} className="closeButton">
                    <FontAwesomeIcon icon={faX} />
                </button>
                <h2 className="username">
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
                    Status: <strong>{aanvraag.isApproved === null ? 'Openstaand' : aanvraag.isApproved ? 'Goedgekeurd' : 'Afgewezen'}</strong>
                </p>
                <p>
                    Reden: <strong>{aanvraag.reden}</strong>
                </p>
            </div>
        </div>
    );
};

export default LeaveHistoryInfo;
