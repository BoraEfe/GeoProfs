import './Vakantiedagen.css';
import React, { useState } from 'react';

const Vakantiedagen = () => {
    const [vakantieBeginData, setvakantieBeginData] = useState ('');
    const [vakantieEindData, setvakantieEindData] = useState ('');

    const test = (e) => {
        e.preventDefault();
        console.log('test');
    }
    return(
        <> 
        <div className='vakantieaanvraag-container'>
          <div className='vakantieaanvraag-form'>
              <form onSubmit={test}>
                  <p>Van datum</p>
                  <input 
                      type='date' 
                      value={vakantieBeginData}
                      required>                        
                  </input>
                  <p>Tot datum</p>
                  <input 
                      type='date' 
                      value={vakantieEindData}
                      required>
                  </input>
                  <p>Reden</p>
                  <textarea
                  placeholder='Reden van vakantie'
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
    )
}
export default Vakantiedagen;