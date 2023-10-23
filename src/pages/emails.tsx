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

    return (
        <section className="relative pt-20">
           <div className="w-full overflow-x-auto md:px-20 text-black dark:text-white">
                <table className="table table-zebra min-w-[300px]">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Message</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {emails.map((email,index) =>
                      
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{email.name}</td>
                            <td>{email.message}</td>
                            <td>
                                <Link to={`/emails/${email._id}`}>details</Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ContactEmails;