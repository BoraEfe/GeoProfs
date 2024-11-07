import './ChangeTemporaryPassword.css';
import { useState } from 'react';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../../firebase'
import { hashPasswordWithSalt } from '../../components/HashPassword';

const ChangeTemporaryPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const userUUID = sessionStorage.getItem('uuid');

    const handleSubmit = async (e) => {

        const {hashedPassword} = hashPasswordWithSalt(newPassword);

        e.preventDefault();

        
        try{
            const userRef = doc (db, 'users', userUUID);

            await updateDoc(userRef, {
                wachtwoord: hashedPassword,
                tijdelijkWachtwoord: null,
            });

            setSuccess('Wachtwoord succesvol gewijzigd!');
            setError('');  

        }
        catch(error){
            setError('Er is iets misgegaan. Probeer het opnieuw.');
            setSuccess('');
        }
    };
    return(
        <div className='passwordchange-container'>
            <h1>Wachtwoord wijzigen</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>
                        Nieuw wachtwoord
                    </p>
                    <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
                <button type='submit'>Wijzig wachtwoord</button>
            </form>
            <p className='error'>{error}</p>
            <p className='success'>{success}</p>
        </div>
    )
}
export default ChangeTemporaryPassword;