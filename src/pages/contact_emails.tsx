import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

interface IEmails{
    _id?: number,
    name: string,
    lastName: string,
    email: string,
    message: string
}

const ContactEmails = () => {

    const [emails, setEmails] = useState<IEmails[]>([{
        _id: 1,
        name: "",
        lastName: "",
        email: "",
        message: ""
    }])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/getEmails');
            setEmails(response.data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section>
            <div className="overflow-x-scroll">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((email) => {
                        return (

                                <tr key={email._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">                                   
                                            <div>
                                                <div className="font-bold">{email.name} { email.lastName}</div>
                                                <div className="text-sm opacity-50">{ email.email}</div>
                                            </div>                           
                                        </div>
                                    </td>
                        
                                    <td>
                                        {email.email}
                                    </td>
                                        
                                    <td>
                                        {email.message}
                                    </td>
                                        
                                    <th>
                                        <Link to={`/contact-emails/${email._id}`}>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </Link>
                                    </th>
                                
                                </tr>    
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </tfoot>
        
                </table>
            </div>
        </section>
    )
}

export default ContactEmails;