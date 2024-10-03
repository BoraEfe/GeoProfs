import './Vakantiedagen.css';
import React, { useState } from 'react';

const Vakantiedagen = () => {
    const [verkantieBeginData, setVerkantieBeginData] = useState ('');
    const [verkantieEindData, setVerkantieEindData] = useState ('');

    const test = (e) => {
        e.preventDefault();
        console.log('test');
    }
    return(
        <> 
        <div className='verkantieaanvraag-container'>
          <div className='verkantieaanvraag-form'>
              <form onSubmit={test}>
                  <p>Van datum</p>
                  <input 
                      type='date' 
                      value={verkantieBeginData}
                      required>                        
                  </input>
                  <p>Tot datum</p>
                  <input 
                      type='date' 
                      value={verkantieEindData}
                      required>
                  </input>
                  <p>Reden</p>
                  <textarea
                  placeholder='Reden van verkantie'
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