import './Verlofaanvraag.css';
import React, { useState } from 'react';
const Verlofaanvraag = () => {
    const [verlofBeginData, setVerlofBeginData] = useState ('');
    const [verlofEindData, setVerlofEindData] = useState ('');

    const test = (e) => {
        e.preventDefault();
        console.log('test');
    }
  return (
    <> 
      <div className='verlofaanvraag-container'>
        <div className='verlofaanvraag-form'>
            <form onSubmit={test}>
                <p>Van datum</p>
                <input 
                    type='date' 
                    value={verlofBeginData}
                    required>                        
                </input>
                <p>Tot datum</p>
                <input 
                    type='date' 
                    value={verlofEindData}
                    required>
                </input>
                <p>Reden</p>
                <textarea
                placeholder='Reden van verlof'
                style={{ height: '15vh' }}
                maxLength={500}
                >
                </textarea>
                <button 
                className='submit-button' 
                type='submit'>
                    Verstuur
                </button>
            </form>
        </div>
      </div>
    </>
  );
}

export default Verlofaanvraag;