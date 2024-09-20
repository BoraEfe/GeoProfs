import { React } from 'react';
import { useState } from 'react';

const Date = () => {
    const [date, setDate] = useState(new Date());
    return(
        <>
        <h1>Datum: </h1>
        <p> {date.toLocaleString()}</p>
        </>
    )
}
export default Date;