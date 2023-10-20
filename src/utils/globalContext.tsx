import {useContext,createContext, useState} from 'react';

interface ILogin{
    username: string;
    password: string;
}
export interface IUser{
    username: string;
    email: string;
    admin: boolean;
    createdAt: Date;
}

interface IGlobalContext{
    isLoggedIn: boolean;
    setIsLoggedIn: (React.Dispatch<React.SetStateAction<boolean>>);
    login: ILogin;
    setLogin: (React.Dispatch<React.SetStateAction<ILogin>>);
    user: IUser;
    setUser:  (React.Dispatch<React.SetStateAction<IUser>>)
}
const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);


export const GlobalContextProvider = ({children}:{children: React.ReactNode})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [login, setLogin] = useState({} as ILogin);
    const [user, setUser] = useState({} as IUser);

    return(
        <GlobalContext.Provider value={{isLoggedIn,setIsLoggedIn,login,setLogin,user,setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)