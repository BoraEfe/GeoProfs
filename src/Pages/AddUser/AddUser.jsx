import { string } from 'i/lib/util';
import { useState } from 'react';
import './AddUser.css'
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../../firebase'
import { text } from '@fortawesome/fontawesome-svg-core';
import { collection } from 'firebase/firestore';
import { hashPasswordWithSalt } from '../../components/HashPassword';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [employeeFunction, setEmployeeFunction] = useState('');
    const [department, setDepartment] = useState('');
    const [vakantiedagen, setVakantiedagen] = useState('');

    const createUser = async (e) => {

        console.log(department);

        const {hashedPassword} = hashPasswordWithSalt(password);

        console.log(hashedPassword);

        e.preventDefault();

        if (!firstName || !lastName || !email ||!password || !phoneNumber || !employeeFunction || 
            (employeeFunction !== 'CEO' && employeeFunction !== 'Office-manager' && !department)){
            alert("Voer alle velden in!");
            console.log('probleempje');
        }
        
        else{
            try{
              const userDepartment = (employeeFunction === 'CEO' || employeeFunction === 'Office-manager') ? '' : department;  
              const docRef = await addDoc(collection(db, 'users'),{
                    voornaam: firstName,
                    achternaam: lastName,
                    email: email,
                    wachtwoord: hashedPassword,
                    functie: employeeFunction,
                    role: role,
                    departement: userDepartment,
                    vakantiedagen: vakantiedagen, 
                });
                console.log('gelukt!');
                
                const uuid = docRef.id;

                await updateDoc(doc(db, 'users', uuid), {
                    uuid: uuid
                });
                console.log('User aangemaakt met ID: ', uuid);
            }
            catch(error){
                console.log('foutje');
                console.log(error);

            }
        }
    }


    return(
        <div className='adduser-container'>
            <div className='adduser-form-container'>
                <form onSubmit={createUser}>
                    <label>
                        <p>
                            Voornaam
                        </p>
                        <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                     </label>
                     <label>
                        <p>
                            Achternaam
                        </p>
                        <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>
                            email
                        </p>
                        <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>
                           wachtwoord
                        </p>
                        <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>
                            Nummer
                        </p>
                        <input
                        type='number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>
                            Vakantiedagen
                        </p>
                        <input
                        type='number'
                        value={vakantiedagen}
                        onChange={(e) => setVakantiedagen(e.target.value)}
                        />
                    </label>
                    <label>
                     <p>
                        Functie
                     </p>
                     <select
                     value={employeeFunction}
                     onChange={(e) => {
                        setEmployeeFunction(e.target.value);
                        if (e.target.value === "CEO") {
                            setRole('1');
                            setDepartment('');
                        }
                        else if (e.target.value === 'Office-manager'){
                            setRole('2');
                            setDepartment('');
                        }  
                        else if (e.target.value === 'Manager'){
                            setRole('3');
                        }  
                        else if (e.target.value === 'Medewerker'){
                            setRole('4');
                        }   
                     }}
                     >
                        <option value="" disabled>Selecteer department</option>
                        <option value="CEO"> CEO</option>
                        <option value="Office-manager">Offce-manager</option>
                        <option value="Manager">Manager</option>
                        <option value="Medewerker">Medewerker</option>
                     </select>
                    </label>  
                    {employeeFunction !== 'CEO' && employeeFunction !== 'Office-manager' && ( 
                    <label>
                     <p>
                        Departement
                     </p>
                     <select
                     value={department}
                     onChange={(e) => setDepartment(e.target.value)}
                     >
                         <option value="" disabled>Selecteer een departement</option>
                        <option value="geoict">Geo-ICT</option>
                        <option value="geodesy">Geodesy</option>
                        <option value="relationmanagement">Relation management</option>
                        <option value="finance">Finance</option>
                        <option value="hrm">HRM</option>
                        <option value="ict">ICT</option>
                     </select>
                    </label>
                    )} 
                    <button type='submit'>
                        Voeg medewerker toe
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default AddUser;