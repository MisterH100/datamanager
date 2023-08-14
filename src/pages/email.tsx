import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

interface IEmail{
    name: string,
    lastName: string,
    email: string,
    message: string
}

const Email = () => {
    const [email, setEmail] = useState<IEmail>({
        name: "",
        lastName: "",
        email: "",
        message: ""
    });

    const { emailId } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getEmails/${emailId}`);
            setEmail(response.data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="w-full px-[20px] min-w-[300px]">

            <div>
                <div className="flex border-b gap-[10px]">
                    <h1 className="text-5xl font-bold">{email.name}</h1>
                    <p className="py-6">{email.email}</p>
                </div>
                <p className="py-6">{email.message}</p>

                <Link to={'/contact-emails'}>
                    <button className="btn btn-ghost btn-xs">back</button>
                </Link>
            </div>

        </section>
    )
}

export default Email;