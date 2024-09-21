import React from 'react';

const CurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const minute = today.getMinutes();
    const hour = today.getHours();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    const currentDate = `${day}/${formattedMonth}/${year} ${hour}:${formattedMinute}`;
    
    return(
        <li>
            <a>{currentDate}</a>
        </li>
    );
}

export default CurrentDate;
