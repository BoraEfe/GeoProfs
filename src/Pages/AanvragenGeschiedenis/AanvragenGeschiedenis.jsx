import './AanvragenGeschiedenis.css';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import LeaveHistoryInfo from '../../Components/LeaveHistoryInfo/LeaveHistoryInfo';

const AanvragenGeschiedenis = () => {
    const [userUUID, setUserUUID] = useState(null);
    const [openstaandeAanvragen, setOpenstaandeAanvragen] = useState([]);
    const [afgehandeldeAanvragen, setAfgehandeldeAanvragen] = useState([]);
    const [selectedAanvraag, setSelectedAanvraag] = useState(null);
    const [selectedAanvraagId, setSelectedAanvraagId] = useState(null);

    useEffect(() => {
        const fetchUuid = async () => {
            try {
                let uuid = sessionStorage.getItem('uuid');
                console.log("Ingelogde UUID: ", uuid);
                setUserUUID(uuid);
            } catch (error) {
                console.error("Fout bij het ophalen van de UUID:", error);
            }
        };

        fetchUuid();
    }, []);

    useEffect(() => {
        const fetchOpenstaandeAanvragen = async () => {
            if (!userUUID) return;

            try {
                const aanvragenRef = collection(db, 'Aanvragen');
                const q = query(aanvragenRef, where('uuid', '==', userUUID));
                const aanvragenSnapshot = await getDocs(q);
                const aanvragen = aanvragenSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOpenstaandeAanvragen(aanvragen);
            } catch (error) {
                console.error('Fout bij het ophalen van openstaande aanvragen:', error);
            }
        };

        const fetchAfgehandeldeAanvragen = async () => {
            if (!userUUID) return;

            try {
                const goedgekeurdeRef = collection(db, 'goedgekeurdeAanvragen');
                const afgekeurdeRef = collection(db, 'afgekeurdeAanvragen');

                const [goedgekeurdSnapshot, afgekeurdSnapshot] = await Promise.all([
                    getDocs(query(goedgekeurdeRef, where('uuid', '==', userUUID))),
                    getDocs(query(afgekeurdeRef, where('uuid', '==', userUUID))) 
                ]);

                const goedgekeurdeAanvragen = goedgekeurdSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    status: 'Goedgekeurd',
                    ...doc.data(),
                }));

                const afgekeurdeAanvragen = afgekeurdSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    status: 'Afgekeurd',
                    ...doc.data(),
                }));

                setAfgehandeldeAanvragen([...goedgekeurdeAanvragen, ...afgekeurdeAanvragen]);
            } catch (error) {
                console.error('Fout bij het ophalen van afgehandelde aanvragen:', error);
            }
        };

        fetchOpenstaandeAanvragen();
        fetchAfgehandeldeAanvragen();
    }, [userUUID]);

    const formatTimestamp = (value) => {
        if (!value) return 'Datum onbekend';

        if (value.seconds) {
            return new Date(value.seconds * 1000).toLocaleDateString();
        } else if (typeof value === 'string') {
            return new Date(value).toLocaleDateString();
        } else {
            return 'Ongeldig formaat';
        }
    };

    return (
        <div className='AanvragenGeschiedenis'>
            <div className="container">
                <h1 data-testid='openstaande-verzoeken-title'>Openstaande verzoeken</h1>
                {openstaandeAanvragen.length > 0 ? (
                    <ul>
                        {openstaandeAanvragen.map((aanvraag) => (
                            <li key={aanvraag.id}
                                onClick={() => {
                                    setSelectedAanvraag(aanvraag);
                                    setSelectedAanvraagId(aanvraag.id);
                                }}
                            >
                                <div className="aanvraag-info">
                                    <span className="oranje-stip"></span>
                                    <div className="aanvraag-details">
                                        <p><strong>Medewerker:</strong> {aanvraag.medewerker || 'Naam onbekend'}</p>
                                        <p><strong>Begin datum:</strong> {formatTimestamp(aanvraag.beginDatum)}</p>
                                        <p><strong>Eind datum:</strong> {formatTimestamp(aanvraag.eindDatum)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Geen openstaande aanvragen</p>
                )}
            </div>
            <div className="container">
                <h1>Afgehandelde verzoeken</h1>
                {afgehandeldeAanvragen.length > 0 ? (
                    <ul>
                        {afgehandeldeAanvragen.map((aanvraag) => (
                            <li key={aanvraag.id}
                                onClick={() => {
                                    setSelectedAanvraag(aanvraag);
                                    setSelectedAanvraagId(aanvraag.id);
                                }}
                            >
                                <div className="aanvraag-info">
                                    <span
                                        className={
                                            aanvraag.status === 'Goedgekeurd' ? 'groene-stip' : 'rode-stip'
                                        }
                                    ></span>
                                    <div className="aanvraag-details">
                                        <p><strong>Medewerker:</strong> {aanvraag.medewerker || 'Naam onbekend'}</p>
                                        <p><strong>Begin datum:</strong> {formatTimestamp(aanvraag.beginDatum)}</p>
                                        <p><strong>Eind datum:</strong> {formatTimestamp(aanvraag.eindDatum)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Geen afgehandelde aanvragen</p>
                )}
            </div>

            {selectedAanvraag && (
                <LeaveHistoryInfo
                    aanvraag={selectedAanvraag}
                    aanvraagId={selectedAanvraagId}
                    onClose={() => {
                        setSelectedAanvraag(null);
                    }}
                />
            )}
        </div>
    );
};

export default AanvragenGeschiedenis;
