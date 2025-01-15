import './AanvragenGeschiedenis.css';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const AanvragenGeschiedenis = () => {
    const [userID, setUserID] = useState();
    const [openstaandeAanvragen, setOpenstaandeAanvragen] = useState([]);
    const [afgehandeldeAanvragen, setAfgehandeldeAanvragen] = useState([]);

    useEffect(() => {
        const fetchOpenstaandeAanvragen = async () => {
            try {
                const aanvragenRef = collection(db, 'Aanvragen');
                const aanvragenSnapshot = await getDocs(aanvragenRef);
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
            try {
                const goedgekeurdeRef = collection(db, 'goedgekeurdeAanvragen');
                const afgekeurdeRef = collection(db, 'afgekeurdeAanvragen');

                const [goedgekeurdSnapshot, afgekeurdSnapshot] = await Promise.all([
                    getDocs(goedgekeurdeRef),
                    getDocs(afgekeurdeRef),
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
    }, []);

    const formatTimestamp = (value) => {
        if (!value) return 'Datum onbekend';

        if (value.seconds) {
            // Firebase Timestamp
            return new Date(value.seconds * 1000).toLocaleDateString();
        } else if (typeof value === 'string') {
            // Date as string
            return new Date(value).toLocaleDateString();
        } else {
            return 'Ongeldig formaat';
        }
    };

    return (
        <main>
            <div className="container">
                <h1>Openstaande verzoeken</h1>
                {openstaandeAanvragen.length > 0 ? (
                    <ul>
                        {openstaandeAanvragen.map((aanvraag) => (
                            <li key={aanvraag.id}>
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
                            <li key={aanvraag.id}>
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
        </main>
    );
};

export default AanvragenGeschiedenis;
