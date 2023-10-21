import {useContext,createContext, useState, useEffect} from 'react';
import { useLocalStroge } from './useLocalStorage';
import axios from 'axios';

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
    localUser: IUser;
    setLocalUser: (React.Dispatch<React.SetStateAction<IUser>>);
    token: string;
    setToken: (React.Dispatch<React.SetStateAction<string>>);
    isAuthenticated: boolean;
    setIsAuthenticated: (React.Dispatch<React.SetStateAction<boolean>>);
    logOut: () => void;

}
const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);


export const GlobalContextProvider = ({children}:{children: React.ReactNode})=>{
    const [login, setLogin] = useState({} as ILogin);
    const [localUser, setLocalUser] = useLocalStroge<IUser>("localUser", {} as IUser)
    const [token, setToken] = useLocalStroge<string>("token", " ")
    const [isAuthenticated, setIsAuthenticated]= useState(false);

    const logOut = () =>{
        setLogin({} as ILogin);
        setLocalUser({} as IUser);
        setIsAuthenticated(false);
        setToken("");
    }
    
    useEffect(() =>{
        const checkAuth =async()=>{
          axios.post("https://misterh-api-server.onrender.com/api/auth", {
            user: localUser,
          },
          {headers: {
            'auth-token': token,
          }}).then(response =>{
            setIsAuthenticated(response.data.authenticated)
          })
        }
        if(isAuthenticated == false){
            logOut();
        }
        checkAuth()
    },[])

    return(
        <GlobalContext.Provider value={{login,setLogin,localUser,setLocalUser,token,setToken,isAuthenticated, setIsAuthenticated,logOut}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)