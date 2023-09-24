import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

interface IEmail{
    name: string,
    email: string,
    message: string
}

const Email = () => {
    const [loading, setLoading] = useState<boolean>();
    const [feedback, setFeedback] = useState<boolean>();

    const [arlet, setArlet] = useState({
        image: "",
        alertMessage: ""
    })
    const [email, setEmail] = useState<IEmail>({
        name: "",
        email: "",
        message: ""
    });

    const { emailId } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://misterh-api-server.onrender.com/api/emails/email/${emailId}`);
            setEmail(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteData = () => {
        setLoading(true);
        try {
            axios.delete(`https://misterh-api-server.onrender.com/api/emails/email/${emailId}`);
            setTimeout(() => {
                setLoading(false)
                setFeedback(true);
                setArlet({
                    ...arlet,
                    image: ":)",
                    alertMessage: "email deleted"
                });

            }, 2000)
        } catch (error) {
            console.log(error);
            setFeedback(true)
            setArlet({
                ...arlet,
                image: "!",
                alertMessage: "unable to delete email"
            });
        }
    }   
    useEffect(() => {
        fetchData();
    }, [email]);

    return (
        <section className="w-full px-10 md:px-60 min-w-[300px]">
            <div>
                <div className="flex flex-col md:flex-row border-b gap-[10px]">
                    <h1 className="text-5xl font-bold">{email.name}</h1>
                    <p className="py-6">{email.email}</p>
                </div>
                <p className="py-6">{email.message}</p>

            </div>
            <div className="w-full flex items-center justify-between gap-[10px]">
                <Link to={'/'}>
                    <button className="btn btn-md w-28">back</button>
                </Link>
                <button onClick={deleteData} className="btn-error btn btn-md">
                    {loading? "deleting...": "delete"}
                </button>
                {feedback ? 
                        <div className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{arlet.alertMessage}</span>
                        <div>{ arlet.image}</div>
                        </div>
                : ""}

            </div>
           
        </section>
    )
}

export default Email;