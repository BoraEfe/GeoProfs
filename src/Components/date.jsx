import React from 'react';

const CurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const minute = today.getMinutes();
    const hour = today.getHours();
    let currentDate;
    if (month < 10) {
        currentDate = day + "/0" + month + "/" + year + " " + hour + ":" + minute;
    } else {
        currentDate = day + "/" + month + "/" + year + " " + hour + ":" + minute;   
    }
    
    return(
        <li>
            <a>{currentDate}</a>
        </li>
    );
}

export default CurrentDate;
