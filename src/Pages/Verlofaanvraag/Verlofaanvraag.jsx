import './Verlofaanvraag.css';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Verlofaanvraag = () => {
    const [verlofBeginData, setVerlofBeginData] = useState ('');
    const [verlofEindData, setVerlofEindData] = useState ('');
    const [reden, setReden] = useState('');
    const [confirmation, setConfirmation] = useState();
    
    const test = (e) => {
        e.preventDefault();
        console.log('test');
    }
  return (
    <>
      <div className='verlofaanvraag-container'>
        <div className='verlofaanvraag-form'>
            <form onSubmit={test}>
              <div className="data">
                <p>Van datum</p>
                <input 
                    type='date' 
                    value={verlofBeginData}
                    onChange={(e) => setVerlofBeginData(e.target.value)}
                    required>                        
                </input>
                <p>{verlofBeginData}</p>
                <p>Tot datum</p>
                <input 
                    type='date' 
                    value={verlofEindData}
                    onChange={(e) => setVerlofEindData(e.target.value)}
                    required>
                </input>
                <p>{verlofEindData}</p>
                <button 
                className='submit-button' 
                type='submit'>
                    Verstuur
                </button>
                </div>
                <div className="reden">
                <p>Reden van verlof</p>
                <textarea
                placeholder='...'
                maxLength={500}
                required
                >
                </textarea>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}

export default Verlofaanvraag;