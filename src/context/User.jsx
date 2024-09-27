import {useState, createContext, useContext} from 'react';

const UserContext = createContext();

export const useUser = () =>useContext(UserContext) 

    export const UserProvider = ({children}) =>{
        const [user, setUser] = useState({
            username: '',
            firstname:'',
            lastname: '',
            email: '',
            vakantiedagen: '0',
            role:'',
            isLoggedIn:'false', 
        });
        return(
            <UserContext.Provider value={{user, setUser}}>
                {children}
            </UserContext.Provider>
     );
};

