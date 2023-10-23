import { useEffect, useState } from "react"
import { IUser, useGlobalContext } from "./globalContext"
import axios from "axios";


export const useGetUser = (userId: any) =>{
    const [user, setUser] = useState<IUser>({} as IUser);
    const {setLoading} = useGlobalContext();

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://misterh-api-server.onrender.com/api/user/${userId}`);
            setUser(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    } 
    useEffect(() => {
        fetchData();
    }, []);

    return user
}