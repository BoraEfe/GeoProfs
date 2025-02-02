import React, { useState, useEffect } from 'react';
import './adminpage.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import LeaveInfo from '../../Components/leaveInfo/LeaveInfo';

const AdminPage = () => {
    const [searchLeave, setSearchLeave] = useState('');
    const [searchAcceptedLeave, setSearchAcceptedLeave] = useState('');
    const [searchRejectedLeave, setSearchRejectedLeave] = useState('');
    const [selectedAanvraagId, setSelectedAanvraagId] = useState(null);
    const [selectedPendingLeave, setSelectedPendingLeave] = useState(null);
    const [verlofaanvragen, setVerlofaanvragen] = useState([]);
    const [goedgekeurdeAanvragen, setGoedgekeurdeAanvragen] = useState([]);
    const [afgekeurdeAanvragen, setAfgekeurdeAanvragen] = useState([]);
    const department = sessionStorage.getItem('department')
    const [managerDepartment, setManagerDepartment] = useState(department);  // Geen initiële waarde zoals 'hrm', want we willen deze dynamisch instellen

    const uuid = sessionStorage.getItem('uuid')
useEffect(() => {
    const fetchUserDepartment = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uuid', '==', uuid));  // Zoek op basis van de 'uuid'
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setManagerDepartment(userData.departement || '');  // Zet het departement, of een lege string als het niet bestaat
            } else {
                console.error("Geen gebruikersgegevens gevonden.");
                setManagerDepartment('');  // Als geen gebruiker wordt gevonden, zet het departement op een lege string
            }
        } catch (error) {
            console.error("Fout bij het ophalen van het departement:", error);
        }
    };

    fetchUserDepartment();  // Haal de data op bij het laden van de component
}, [uuid]);
    
useEffect(() => {
    const searchUserInLeaveRequest = async () => {
        try {
            const leaveRequestRef = collection(db, 'Aanvragen');
            const leaveRequestSnapshot = await getDocs(leaveRequestRef);
            const leaveRequest = leaveRequestSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Filter aanvragen:
            // - Als je geen departement hebt, toon alle aanvragen.
            // - Als je hrm bent, toon alleen aanvragen van het hrm-departement.
            // - Anders, toon alleen aanvragen van jouw eigen departement.
            const filteredRequests = leaveRequest.filter(aanvraag => {
                if (managerDepartment === '') {
                    // Als je geen departement hebt, toon alles
                    return true;
                } else if (managerDepartment === 'hrm') {
                    // Als je hrm bent, toon alleen aanvragen van het hrm-departement
                    return aanvraag.departement === 'hrm';
                } else {
                    // Als je een ander departement hebt, toon alleen aanvragen van jouw departement
                    return aanvraag.departement === managerDepartment;
                }
            });

            setVerlofaanvragen(filteredRequests);
        } catch (error) {
            console.error('Error fetching leave requests: ', error);
        }
    };

    searchUserInLeaveRequest();
}, [managerDepartment]);

    useEffect(() => {
        const searchUserInAcceptedLeaveRequest = async () => {
            try {
                const leaveRequestRef = collection(db, 'goedgekeurdeAanvragen');
                const leaveRequestSnapshot = await getDocs(leaveRequestRef);
                const leaveRequest = leaveRequestSnapshot.docs.map(doc => doc.data());

                // Filter aanvragen:
                // - Toon aanvragen zonder departement voor alle managers.
                // - Toon aanvragen met departement alleen voor de manager van dat departement.
                const filteredRequests = leaveRequest.filter(aanvraag =>
                    !aanvraag.departement || aanvraag.departement === managerDepartment
                );
                setGoedgekeurdeAanvragen(filteredRequests);
            } catch (error) {
                console.error('Error fetching leave requests: ', error);
            }
        };
        searchUserInAcceptedLeaveRequest();
    }, [managerDepartment]);

    useEffect(() => {
        const searchUserInRejectedLeaveRequest = async () => {
            try {
                const leaveRequestRef = collection(db, 'afgekeurdeAanvragen');
                const leaveRequestSnapshot = await getDocs(leaveRequestRef);
                const leaveRequest = leaveRequestSnapshot.docs.map(doc => doc.data());

                // Filter aanvragen:
                // - Toon aanvragen zonder departement voor alle managers.
                // - Toon aanvragen met departement alleen voor de manager van dat departement.
                const filteredRequests = leaveRequest.filter(aanvraag =>
                    !aanvraag.departement || aanvraag.departement === managerDepartment
                );
                setAfgekeurdeAanvragen(filteredRequests);
            } catch (error) {
                console.error('Error fetching leave requests: ', error);
            }
        };
        searchUserInRejectedLeaveRequest();
    }, [managerDepartment]);

    return (
        <div className='adminpage'>
            <div className='heading'>
                <h1>Verlofbeheer</h1>
            </div>
            <div className="container-fluid">
                <div className="goedgekeurde-verlof-aanvragen">
                    <h2>Goedgekeurde verlof aanvragen</h2>
                    <input 
                        type="text" 
                        id="search-user" 
                        name="search"
                        value={searchAcceptedLeave}
                        onChange={(e) => setSearchAcceptedLeave(e.target.value)}
                        placeholder='Zoek medewerker'/>  
                    <p>Alle aanvragen</p>
                    <div className='ul-container'>
                        {goedgekeurdeAanvragen.length > 0 ? (
                            <ul>
                                {goedgekeurdeAanvragen.filter((aanvraag) =>
                                    aanvraag.medewerker?.toLowerCase().includes(searchAcceptedLeave.toLowerCase())
                                ).map((aanvraag, index) => (
                                    <li key={index}
                                        onClick={() => {
                                            setSelectedPendingLeave(aanvraag);
                                            setSelectedAanvraagId(aanvraag.id);
                                        }}
                                    >
                                        <span className='groene-stip'></span>{aanvraag.medewerker || "Naam onbekend"}
                                        <p>{aanvraag.timestamp ? new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString() : "Datum onbekend"}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Geen aanvragen</p>
                        )}
                    </div>
                </div>
                <div className="openstaande-verlof-aanvragen">
                    <h2>Openstaande verlof aanvragen</h2>
                    <input  
                        type="text"
                        id="search-user" 
                        name="search"
                        value={searchLeave}
                        onChange={(e) => setSearchLeave(e.target.value)}
                        placeholder='Zoek medewerker'/>
                    <p>Alle aanvragen</p>
                    <div className='ul-container'>
                        {verlofaanvragen.length > 0 ? (
                            <ul>
                                {verlofaanvragen.filter((aanvraag) =>
                                    aanvraag.medewerker?.toLowerCase().includes(searchLeave.toLowerCase())
                                ).map((aanvraag, index) => (
                                    <li 
                                        key={index}
                                        onClick={() => {
                                            setSelectedPendingLeave(aanvraag);
                                            setSelectedAanvraagId(aanvraag.id);
                                        }}
                                    >                                     
                                        <span className='oranje-stip'></span>{aanvraag.medewerker || "Naam onbekend"}
                                        <p>{aanvraag.timestamp ? new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString() : "Datum onbekend"}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Geen aanvragen</p>
                        )}
                    </div>
                    {selectedPendingLeave && (
                        <LeaveInfo
                            aanvraag={selectedPendingLeave}
                            aanvraagId={selectedAanvraagId}
                            onClose={() => {
                                setSelectedPendingLeave(null);
                            }}
                        />
                    )}
                </div>
                <div className="afgekeurde-verlof-aanvragen">
                    <h2>Afgekeurde verlof aanvragen</h2>
                    <input 
                        type="text" 
                        id="search-user" 
                        name="search" 
                        value={searchRejectedLeave}
                        onChange={(e) => setSearchRejectedLeave(e.target.value)}
                        placeholder='Zoek medewerker'/>
                    <p>Alle aanvragen</p>
                    <div className='ul-container'>
                        {afgekeurdeAanvragen.length > 0 ? (
                            <ul>
                                {afgekeurdeAanvragen.filter((aanvraag) => 
                                    aanvraag.medewerker?.toLowerCase().includes(searchRejectedLeave.toLowerCase())
                                ).map((aanvraag, index) => (
                                    <li key={index}
                                        onClick={() => {
                                            setSelectedPendingLeave(aanvraag);
                                            setSelectedAanvraagId(aanvraag.id);
                                        }}
                                    > 
                                        <span className='rode-stip'></span>{aanvraag.medewerker || "Naam onbekend"}
                                        <p>{aanvraag.timestamp ? new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString() : "Datum onbekend"}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Geen aanvragen</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
