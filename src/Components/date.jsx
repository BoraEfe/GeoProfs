import React from 'react';

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
let currentDate;

const updateDate = async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const minute = today.getMinutes();
    const hour = today.getHours();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    currentDate = (`${day}/${formattedMonth}/${year} ${hour}:${formattedMinute}`);

    await delay(60000);
    updateDate();
}
updateDate();
    
const CurrentDate = () => {
    return(
        <li>
            {currentDate}
        </li>
    );
}

export default CurrentDate;
