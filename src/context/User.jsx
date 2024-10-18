import {useState, createContext, useContext} from 'react';

const UserContext = createContext();

export const useUser = () =>useContext(UserContext) 

    export const UserProvider = ({children}) =>{
        const [user, setUser] = useState({
            username: '',
            firstname:'',
            lastname: '',
            email: '',
            vakantiedagen: '30',
            role:'',
            isLoggedIn:'false', 
            uuid:'',
        });
        return(
            <UserContext.Provider value={{user, setUser}}>
                {children}
            </UserContext.Provider>
     );
};