import {useContext,createContext, useState, useEffect} from 'react';
import { useLocalStroge } from './useLocalStorage';
import axios from 'axios';

export interface ILogin{
    email: string;
    password: string;
}

export interface IRecent{
    username: string;
    token: string;
}
export interface IUser{
    _id: number, 
    name: string,
    surname: string,
    username: string;
    email: string;
    admin: boolean;
    createdAt: Date;   
}

interface IGlobalContext{
    login: ILogin;
    setLogin: (React.Dispatch<React.SetStateAction<ILogin>>);
    user: IUser;
    setUser: (React.Dispatch<React.SetStateAction<IUser>>);
    token: string;
    setToken: (React.Dispatch<React.SetStateAction<string>>);
    recent: IRecent;
    setRecent: (React.Dispatch<React.SetStateAction<IRecent>>);
    isAuthenticated: boolean;
    setIsAuthenticated: (React.Dispatch<React.SetStateAction<boolean>>);
    logOut: () => void;
    loading: boolean;
    setLoading: (React.Dispatch<React.SetStateAction<boolean>>);

}
const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);


export const GlobalContextProvider = ({children}:{children: React.ReactNode})=>{
    const [login, setLogin] = useState({} as ILogin);
    const [user, setUser] = useState({} as IUser);
    const [token, setToken] = useLocalStroge<string>("token", " ");
    const [recent, setRecent] = useLocalStroge<IRecent>("recent", {} as IRecent)
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    const [loading, setLoading] = useState(false)

    const logOut = () =>{
        window.location.href = "/"
        setIsAuthenticated(false);
        setToken(" ");
    }
    
    const checkAuth = async() =>{
        setLoading(true)
        try {
            
            await axios.post("https://misterh-api-server.onrender.com/api/auth",{
                username: user.username
            },
            {headers: {
              'auth-token': token,
            }}).then(response =>{
              setIsAuthenticated(response.data.authenticated)
              setUser(response.data.user)
              setLoading(false)
            })
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
        }
    }

    useEffect(() =>{
        checkAuth()
    },[])

    return(
        <GlobalContext.Provider value={
            {
                login,setLogin,
                user,setUser,
                token,setToken,
                recent,setRecent,
                isAuthenticated, setIsAuthenticated,
                logOut,
                loading,setLoading
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)