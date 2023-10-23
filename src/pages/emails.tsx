import { Link } from "react-router-dom";
import { useGetEmails } from "../utils/useGetEmails";
import { useGlobalContext } from "../utils/globalContext";
import { Loading } from "../components/loading";



const ContactEmails = () => {
    const {loading} = useGlobalContext();
    const emails = useGetEmails();

    return (
        <section className="relative pt-20 min-h-screen">
            {loading?<Loading/>:
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
            }
        </section>
    )
}

export default ContactEmails;