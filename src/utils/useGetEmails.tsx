import { useEffect, useState } from "react"
import { useGlobalContext } from "./globalContext"
import axios from "axios"


interface IEmails{
    _id?: number,
    name: string,
    email: string,
    message: string
}

export const useGetEmails = () =>{
    const [emails, setEmails] = useState<IEmails[]>([{}as IEmails])
    const {setLoading} = useGlobalContext()

    const fetchData = async () => {
        setLoading(true);
        try {
            await axios.get('https://misterh-api-server.onrender.com/api/emails').then(response =>{
                setEmails(response.data);
                setLoading(false)
            });
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    } 
    useEffect(() => {
        fetchData();
    }, []);

    return emails
}

interface IEmail{
    _id: number,
    name: string,
    email: string,
    message: string
}

export const useGetEmail = (emailId:any) =>{
    const [email, setEmail] = useState<IEmail>({} as IEmail);
    const {setLoading} = useGlobalContext()

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://misterh-api-server.onrender.com/api/emails/email/${emailId}`);
            setEmail(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    } 
    useEffect(() => {
        fetchData();
    }, []);

    return email
}