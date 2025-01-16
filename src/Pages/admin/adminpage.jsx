import React from 'react';
import { useState, useEffect } from 'react';
import './adminpage.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import LeaveInfo from '../../Components/leaveInfo/LeaveInfo';

const AdminPage = () => {
    const [searchLeave, setSearchLeave] = useState('');
    const [searchAcceptedLeave, setSearchAcceptedLeave] = useState('');
    const [searchRejectedLeave, setSearchRejectedLeave] = useState('');

    const [selectedAanvraagId , setSelectedAanvraagId] = useState(null);
    const [selectedPendingLeave, setSelectedPendingLeave] = useState(null);

    const [verlofaanvragen, setVerlofaanvragen] = useState([]);
    const [goedgekeurdeAanvragen, setGoedgekeurdeAanvragen] = useState([]);
    const [afgekeurdeAanvragen, setAfgekeurdeAanvragen] = useState([]);  

    useEffect(() =>{
        const searchUserInLeaveRequest = async () => {
            try{
                const leaveRequestRef = collection(db, 'Aanvragen');
                const leaveRequestSnapshot = await getDocs(leaveRequestRef);
                const leaveRequest = leaveRequestSnapshot.docs.map(doc => ({
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
                    {selectedPendingLeave &&(
                        <LeaveInfo
                        aanvraag={selectedPendingLeave}
                        aanvraagId = {selectedAanvraagId}
                        onClose={() => {
                            setSelectedPendingLeave(null)
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