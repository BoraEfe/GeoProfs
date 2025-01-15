import './Agenda.css';
import { useState, useEffect } from 'react';

const Agenda = () => {
    const [month, setMonth] = useState( new Date().getMonth()); 
    const [days, setDays] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

    function calculateWeekDays(){
        let year = new Date().getFullYear();    
        let endOfMonth = new Date(year, month + 1,0).getDate();
        const weekdays = [];

        for(let day = 1; day < endOfMonth; day++){
            const date = new Date(year, month, day);
            
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            if(!isWeekend){
                weekdays.push(date);
            }
        }
        setDays(weekdays);   
    }

    useEffect(() => {
        calculateWeekDays();
    },[month]);

    return(
        <div className='agenda-container'>
            <h2>Agenda</h2>
            <div className='buttons-container'>
                <button 
                 className='choose-month'
                 onClick = {() => setMonth((month + 11 ) % 12)}>
                    <span>{'<'}</span>
                </button>
                <div className='current-month'>{months[month] + ` ` + year}</div>
                <button
                 className='choose-month'
                 onClick= {() => setMonth((month + 1) % 12)}>
                    <span>{'>'}</span>
                </button>
            </div>
            <ul>
                <li>Maandag</li>
                <li>Dinsdag</li>
                <li>Woensdag</li>
                <li>Donderdag</li>
                <li>Vrijdag</li>
            </ul>
            <div className='calendar-container'>
            {days.map((day, index) => (
            <div className='day-container'>
                <div key={index} className='day-container'>
                    <div className='day-number'>
                         {`${day.getDate()} ${day.toLocaleString('default', {month: 'short'})} `}
                    </div>
                    <div className='day-name'>
                        {day.toLocaleString('default', { weekday: 'short' })}
                    </div>
                </div>
            </div>    
            ))}
            </div>
        </div>
    )
}
export default Agenda;