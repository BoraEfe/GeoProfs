import React from 'react';
import { useState, useEffect } from 'react';
import './adminpage.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import VerlofInfo from '../../components/verlofInfo/VerlofInfo';

const AdminPage = () => {
    const [searchVerlof, setSearchVerlof] = useState('');
    const [searchAcceptedVerlof, setSearchAcceptedVerlof] = useState('');
    const [searchRejectedVerlof, setSearchRejectedVerlof] = useState('');
    const [selectedAanvraag, setSelectedAanvraag] = useState(null);
    const [verlofaanvragen, setVerlofaanvragen] = useState([]);
    const [goedgekeurdeAanvragen, setGoedgekeurdeAanvragen] = useState([]);
    const [afgekeurdeAanvragen, setAfgekeurdeAanvragen] = useState([]);

    useEffect(() =>{
        const searchUserInLeaveRequest = async () => {
            try{
                const leaveRequestRef = collection(db, 'Aanvragen');
                const leaveRequestSnapshot = await getDocs(leaveRequestRef);
                const leaveRequest = leaveRequestSnapshot.docs.map(doc => doc.data({
                    id: doc.id,
                    ...doc.data(),
                }));
                setVerlofaanvragen(leaveRequest);

                console.log(verlofaanvragen);
            }
            catch(error){
                console.error('Error fetching leave requests: ', error);
            }
        }
        searchUserInLeaveRequest();
    }, []);

    useEffect(() =>{
        const searchUserInAcceptedLeaveRequest = async () => {
            try{
                const leaveRequestRef = collection(db, 'goedgekeurdeAanvragen');
                const leaveRequestSnapshot = await getDocs(leaveRequestRef);
                const leaveRequest = leaveRequestSnapshot.docs.map(doc => doc.data());
                setGoedgekeurdeAanvragen(leaveRequest);

                console.log(verlofaanvragen);
            }
            catch(error){
                console.error('Error fetching leave requests: ', error);
            }
        }
        searchUserInAcceptedLeaveRequest();
    }, []);

    useEffect(() =>{
        const searchUserInRejectedLeaveRequest = async () => {
            try{
                const leaveRequestRef = collection(db, 'afgekeurdeAanvragen');
                const leaveRequestSnapshot = await getDocs(leaveRequestRef);
                const leaveRequest = leaveRequestSnapshot.docs.map(doc => doc.data());
                setAfgekeurdeAanvragen(leaveRequest);

                console.log(verlofaanvragen);
            }
            catch(error){
                console.error('Error fetching leave requests: ', error);
            }
        }
        searchUserInRejectedLeaveRequest();
    }, []);

    

    return (
        <div class='adminpage'>
            <div className='heading'>
                <h1>Admin Page</h1>
            </div>
            <div className="container-fluid">
                <div className="goedgekeurde-verlof-aanvragen">
                    <h2>Goedgekeurde verlof aanvragen</h2>
                    <input 
                    type="text" 
                    id="search-user" 
                    name="search"
                    value={searchAcceptedVerlof}
                    onChange={(e) => setSearchAcceptedVerlof(e.target.value)}
                    placeholder='Zoek medewerker'/>  
                    <p>Alle aanvragen</p>
                    {goedgekeurdeAanvragen.length > 0 ? (
                        <ul>
                            {goedgekeurdeAanvragen.filter((aanvraag) =>
                            aanvraag.medewerker?.toLowerCase().includes(searchAcceptedVerlof.toLowerCase())
                            ).map((aanvraag, index) => (
                                <li key={index}> 
                                    <span className='groene-stip'></span>{aanvraag.medewerker || "Naam onbekend"}
                                    <p>{aanvraag.timestamp ? new Date(aanvraag.timestamp.seconds * 1000).toLocaleDateString() : "Datum onbekend"}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Geen aanvragen</p>
                    )}
                </div>
                <div className="openstaande-verlof-aanvragen">
                    <h2>Openstaande verlof aanvragen</h2>
                    <input  
                    type="text"
                    id="search-user" 
                    name="search"
                    value={searchVerlof}
                    onChange={(e) => setSearchVerlof(e.target.value)}
                    placeholder='Zoek medewerker'/>
                    <p>Alle aanvragen</p>
                    {verlofaanvragen.length > 0 ? (
                        <ul>
                            {verlofaanvragen.filter((aanvraag) =>
                            aanvraag.medewerker?.toLowerCase().includes(searchVerlof.toLowerCase())
                            ).map((aanvraag, index) => (
                                <li 
                                key={index}
                                onClick={() => {
                                    setSelectedAanvraag(aanvraag);
                                    console.log(aanvraag.id);
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
                    {selectedAanvraag &&(
                        <VerlofInfo
                        aanvraag={selectedAanvraag}
                        onClose={() => setSelectedAanvraag(null)}
                        
                        />
                    )}
                </div>
                <div className="afgekeurde-verlof-aanvragen">
                    <h2>Afgekeurde verlof aanvragen</h2>
                    <input 
                    type="text" 
                    id="search-user" 
                    name="search" 
                    value={searchRejectedVerlof}
                    onChange={(e) => setSearchRejectedVerlof(e.target.value)}
                    placeholder='Zoek medewerker'/>
                    <p>Alle aanvragen</p>
                    {afgekeurdeAanvragen.length > 0 ? (
                        <ul>
                            {afgekeurdeAanvragen.filter((aanvraag) => 
                            aanvraag.medewerker?.toLowerCase().includes(searchRejectedVerlof.toLowerCase())
                            ).map((aanvraag, index) => (
                                <li key={index}> 
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
    );
};                            
 
export default AdminPage;