import './Agenda.css';

const Agenda = () => {



    let days = [];

    function getIncomingDays(){
        for(let i = 0; i < 49; i++){
            let date = new Date();
            function isWeekend(date){
               return date.getDay() === 0 || date.getDay() === 6;
            }
            date.setDate(date.getDate() + i);

            if(!isWeekend(date)){
                days.push(date);
            }
        }
        return days;
    }
    function getIncomingLeave(){
        let Leave = [];
    }

    return(
        <div className='agenda-container'>
            Agenda
            <div className='calendar-container'>
            {getIncomingDays().map((day, index) => (
            <div className='day-container'>
                <div key={index} className='day'>
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