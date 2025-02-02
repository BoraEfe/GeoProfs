import './Agenda.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

const Agenda = () => {
    const [month, setMonth] = useState( new Date().getMonth()); 
    const [days, setDays] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [leaveDays, setLeaveDays] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);

    const userUuid = sessionStorage.getItem('uuid');

    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

    const fetchLeaveRequests = async () => {
        console.log('fetching leave requests');
        if(!userUuid){
            console.log('No user uuid found');
            return;
        }

        const leaveRequestsQuery = query(   
            collection(db, 'Aanvragen'),
            where('uuid', '==', userUuid),
            limit(50)
        )

        const querySnapshot = await getDocs(leaveRequestsQuery);
        const allLeaveRequests = [];

        querySnapshot.docs.forEach((doc) =>{
            const data = doc.data();
            if(data.aantalDagen && Array.isArray(data.aantalDagen)){
                allLeaveRequests.push(...data.aantalDagen);
            }
        })
        setLeaveRequests(allLeaveRequests);
    } 

    const fetchLeaves = async () => {
        console.log('fetching leaves');
        
        if(!userUuid){
            console.log ('No user uuid found');
            return;
        }

        const leavesQuery = query(
            collection(db, 'goedgekeurdeAanvragen'),
            where('uuid', '==', userUuid),
            limit(50)
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
        fetchLeaveRequests();
    }, [])

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
        <div className="w-[90%] min-h-[62vh] h-auto bg-white flex flex-col items-center rounded-[10px] p-4">
          <h2 className="text-black text-2xl font-bold">Agenda</h2>
      
          {/* Navigatieknoppen */}
          <div className="flex flex-row justify-between w-full h-auto p-[10px]">
            <button 
              className="w-[50px] h-[50px] bg-[#d1cbcb] text-black flex items-center justify-center"
              onClick={() => previousMonth()}
            >
              {'<'}
            </button>
            
            <div className="text-[30px] font-bold flex justify-center items-center">
              {months[month]} {year}
            </div>
            
            <button 
              className="w-[50px] h-[50px] bg-[#d1cbcb] text-black flex items-center justify-center"
              onClick={() => nextMonth()}
            >
              {'>'}
            </button>
          </div>
      
          {/* Kalender Grid */}
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(5vw,1fr))] gap-[10px] p-[10px] box-border">
            {days.map((day, index) => {
              const isLeaveDay = leaveDays.some((leaveDay) => {
                const leaveDate = new Date(leaveDay.seconds * 1000);
                return leaveDate.getDate() === day.getDate() &&
                       leaveDate.getMonth() === day.getMonth() &&
                       leaveDate.getFullYear() === day.getFullYear();
              });
      
              const isLeaveRequestDay = leaveRequests.some((leaveRequest) => {
                const leaveDate = new Date(leaveRequest.seconds * 1000);
                return leaveDate.getDate() === day.getDate() &&
                       leaveDate.getMonth() === day.getMonth() &&
                       leaveDate.getFullYear() === day.getFullYear();
              });
      
              return (
                <div 
                  key={index} 
                  className={`flex flex-col items-center justify-center p-[5px] bg-[#f4f4f4] border border-[#ddd] rounded-[8px] text-center 
                    ${isLeaveDay ? 'bg-[rgb(40,214,17)] text-white' : ''} 
                    ${isLeaveRequestDay ? 'bg-orange-500 text-white rounded-[5px] p-[5px]' : ''}`}
                >
                  <div className="text-[16px] font-bold text-[#333]">
                    {`${day.getDate()} ${day.toLocaleString('default', { month: 'short' })}`}
                  </div>
                  <div className="text-[16px] text-[#666]">
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