import {useContext,createContext, useState} from 'react';
import { useLocalStroge } from './useLocalStorage';

export interface ILogin{
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
    login: ILogin;
    setLogin: (React.Dispatch<React.SetStateAction<ILogin>>);
    user: IUser;
    setUser:  (React.Dispatch<React.SetStateAction<IUser>>);
    localUser: IUser;
    setLocalUser: (React.Dispatch<React.SetStateAction<IUser>>)
}
const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);


export const GlobalContextProvider = ({children}:{children: React.ReactNode})=>{
    const [login, setLogin] = useState({} as ILogin);
    const [user, setUser] = useState({} as IUser);
    const [localUser, setLocalUser] = useLocalStroge<IUser>("localUser", {} as IUser)

    return(
        <GlobalContext.Provider value={{login,setLogin,user,setUser,localUser,setLocalUser}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)