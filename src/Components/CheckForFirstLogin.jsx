import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CheckForFirstLogin = (user) => {
    const usersRef = collection(db, 'users');
    const getUsers = async () => {
        const data = await getDocs(usersRef);
        data.forEach(doc => {
             user = doc.data();
            if (user.tijdelijkWachtwoord !== ""){ {
                return(
                    <div className=" temporaryToPermanentPassword">
                        <h1>Verander uw tijdelijk wachtwoord nu!</h1>
                        <input type="password" placeholder="Nieuw wachtwoord"></input>
                        <input type="password" placeholder="Herhaal nieuw wachtwoord"></input>
                        <button>Bevestig</button>
                    </div>
                )
            }
        }});
    };
    getUsers();

}
export default CheckForFirstLogin;

