import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";

const CheckForFirstLogin = (user) => {

    const usersRef = collection(db, 'users');
    const getUsers = async () => {
        const data = await getDocs(usersRef);
        data.forEach(doc => {
             user = doc.data();
            if (user.tijdelijkWachtwoord !== ""){ {
                console.log("Uw wachtwoord is nog niet veranderd. Verander uw wachtwoord nu!");
                window.location.href = '/ChangeTemporaryPassword';
                return;
            }
        }});
    };
    useEffect(() => {
    getUsers();
    }, []);
    return null; 

}
export default CheckForFirstLogin;

