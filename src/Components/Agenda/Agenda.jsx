import './Agenda.css';

const Agenda = () => {

    let days = [];

    function getIncomingDays(){
        for(let i = 0; i < 30; i++){
            let date = new Date();
            date.setDate(date.getDate() + i);
            days.push(date);
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