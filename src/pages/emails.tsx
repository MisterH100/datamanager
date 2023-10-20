import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from "../utils/globalContext";


interface IEmails{
    _id?: number,
    name: string,
    email: string,
    message: string
}

const ContactEmails = () => {
    const [emails, setEmails] = useState<IEmails[]>([{
        _id: 1,
        name: "",
        email: "",
        message: ""
    }])
    const {user} = useGlobalContext();

    const fetchData = async () => {
        try {
            const response = await axios.get('https://misterh-api-server.onrender.com/api/emails');
            setEmails(response.data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(() => {
        fetchData();
    }, [emails]);

    return (
        <section className="relative">
            {user.admin == true?
                <table className="w-full md:w-3/4 mx-auto table rounded-none">
                    <thead>
                        <tr className="bg-base-300">
                            <th>Name</th>
                            <th className="hidden md:inline-block">email</th>
                            <th>Open email</th>
                        </tr>
                    </thead>
                    {emails?
                        <tbody>
                            {emails.map((email) => {
                            return (

                                    <tr key={email._id} className="odd:bg-base-200 even:bg-base-300">
                                        <td>                              
                                            <div className="font-bold">{email.name}</div>
                                            <div className="text-xs sm:text-sm opacity-50">{ email.email}</div>                        
                                        </td>
                                            
                                        <td className="hidden md:inline">
                                            {email.message}
                                        </td>
                                            
                                        <th>
                                            <Link to={`/emails/${email._id}`}>
                                                <button className="btn btn-ghost btn-xs">details</button>
                                            </Link>
                                        </th>
                                    
                                    </tr>    
                                )
                            })}
                            <tr>
                                <th></th>
                                    <td>
                                        {emails.length == 0? "No emails": ''}
                                    </td>
                                <th></th>
                            </tr>
                        </tbody>: null
                    }
                </table>:
                null
            }
        </section>
    )
}

export default ContactEmails;