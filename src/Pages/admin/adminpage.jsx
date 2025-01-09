import React from 'react';
import './adminpage.css';

const AdminPage = () => {
    return (
        <div class='adminpage'>
            <div className='heading'>
                <h1>Admin Page</h1>
            </div>
            <div className="container-fluid">
                <div className="goedgekeurde-verlof-aanvragen"></div>
                <div className="openstaande-verlof-aanvragen"></div>
                <div className="afgekeurde-verlof-aanvragen"></div>
            </div>
        </div>
    );
};                            
 
export default AdminPage;