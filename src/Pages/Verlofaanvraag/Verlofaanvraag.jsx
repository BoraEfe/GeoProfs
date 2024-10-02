import './Verlofaanvraag.css';
import React, { useState } from 'react';
const Verlofaanvraag = () => {
  const [verlofBeginData, setVerlofBeginData] = useState ('');
  const [verlofEindData, setVerlofEindData] = useState ('');

  const today = new Date().toISOString().split('T')[0];

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
                    onChange={(e) => setVerlofBeginData(e.target.value)}
                    min={today}
                    required>                        
                </input>
                <p>{today}</p>
                <p>Tot datum</p>
                <input 
                    type='date' 
                    value={verlofEindData}
                    onChange={(e) => setVerlofEindData(e.target.value)}
                    min={verlofBeginData}
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