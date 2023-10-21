import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


interface IEmails{
    _id?: number,
    name: string,
    email: string,
    message: string
}

const ContactEmails = () => {
    const [emails, setEmails] = useState<IEmails[]>([{}as IEmails])

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
                      
                        <tr key={email._id}>
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