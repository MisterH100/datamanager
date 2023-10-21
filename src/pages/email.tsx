import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

interface IEmail{
    _id: number,
    name: string,
    email: string,
    message: string
}

const Email = () => {
    const [loading, setLoading] = useState<boolean>();
    const [email, setEmail] = useState<IEmail>({} as IEmail);
    const { emailId } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://misterh-api-server.onrender.com/api/emails/email/${emailId}`);
            setEmail(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteData = (id: number) => {
        setLoading(true);
        try {
            axios.delete(`https://misterh-api-server.onrender.com/api/emails/email/${id}`);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }   
    useEffect(() => {
        fetchData();
    }, [email]);

    return (
        <section className="w-full px-10 md:px-60 pt-20 min-w-[300px]">
            <div className="text-black dark:text-white">

                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 
                        className="text-xl font-semibold text-gray-900 dark:text-white">
                        <Link to={`mailto:${email.email}`}>
                            {email.email}
                        </Link>
                        <span className="text-gray-500 text-sm pl-2">{email.name}</span>
                    </h3>
                    
                </div>

                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {email.message}
                    </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Link 
                        to={'/emails'}
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Back
                    </Link>
                    <button 
                        type="button" 
                        className="text-white bg-red-500 hover:bg-red-900  rounded-lg text-sm font-medium px-5 py-2.5"
                        onClick={()=>deleteData(email._id)}
                        >{loading?"loading...": "Delete"}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Email;