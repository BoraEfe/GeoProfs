import './Agenda.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

const Agenda = () => {
    const [month, setMonth] = useState( new Date().getMonth()); 
    const [days, setDays] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [leaveDays, setLeaveDays] = useState([]);

    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

    const fetchLeaves = async () => {
        const userUuid = sessionStorage.getItem('uuid');
        
        if(!userUuid){
            console.log ('No user uuid found');
            return;
        }

        const leavesQuery = query(
            collection(db, 'goedgekeurdeAanvragen'),
            where('uuid', '==', userUuid),
            limit(100)
        )

        const querySnapshot = await getDocs(leavesQuery);

        const allLeaveDays = [];

        querySnapshot.docs.forEach((doc =>{
            const data = doc.data();
            if(data.aantalDagen && Array.isArray(data.aantalDagen)){
                allLeaveDays.push(...data.aantalDagen);
            }
        }))
        setLeaveDays(allLeaveDays);
    }

    function calculateWeekDays(){
        let year = new Date().getFullYear();    
        let endOfMonth = new Date(year, month + 1,0).getDate();
        const weekdays = [];

        for(let day = 1; day <= endOfMonth; day++){
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
    },[month, year]);

    useEffect(() =>{
        fetchLeaves();
    })

    const previousMonth = () => {
        if(month === 0){
            setMonth(11);
            setYear(year - 1);
        }
        else{
            setMonth(month - 1);
        }
    }
    const nextMonth = () => {
        if(month === 11){
            setMonth(0);
            setYear(year + 1);
        }
        else{
            setMonth(month + 1);    
        }
    }

    return (
        <div className='agenda-container'>
            <h2>Agenda</h2>
            <div className='buttons-container'>
                <button 
                 className='choose-month'
                 onClick={() => previousMonth()}>
                    <span>{'<'}</span>
                </button>
                <div className='current-month'>{months[month] + ` ` + year}</div>
                <button
                 className='choose-month'
                 onClick={() => nextMonth()}>
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
                {days.map((day, index) => {
                    const isLeaveDay = leaveDays.some((leaveDay) => {
                        const leaveDate = new Date(leaveDay.seconds * 1000); 
                        return leaveDate.getDate() === day.getDate() &&
                               leaveDate.getMonth() === day.getMonth() &&
                               leaveDate.getFullYear() === day.getFullYear();
                    });
    
                    return (
                        <div key={index} className={`day-container ${isLeaveDay ? 'leave-day' : ''}`}>
                            <div className='day-number'>
                                {`${day.getDate()} ${day.toLocaleString('default', { month: 'short' })} `}
                            </div>
                            <div className='day-name'>
                                {day.toLocaleString('default', { weekday: 'short' })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    
}
export default Agenda;