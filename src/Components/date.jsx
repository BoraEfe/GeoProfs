import React from 'react';
import {useState, useEffect} from 'react';

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(''); 

    const updateDate = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const minute = today.getMinutes();
        const hour = today.getHours();
    
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
    
        setCurrentDate(`${day}/${formattedMonth}/${year} ${hour}:${formattedMinute}`);
    }
    useEffect(() =>
    {
        const interval = setInterval(updateDate, 1000)
        return () => clearInterval(interval)
    }, [])

    return(
        <li>
            <a>{currentDate}</a>
        </li>
    );
}

export default CurrentDate;
