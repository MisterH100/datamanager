import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGetEmail } from "../utils/useGetEmails";
import { useGlobalContext } from "../utils/globalContext";
import { Loading } from "../components/loading";
import { SideBar } from "../components/sidebar";


const Email = () => {
    const { emailId } = useParams();
    const {loading} = useGlobalContext();
    const email = useGetEmail(emailId);
 

    return (
        <section className="relative w-full min-h-screen min-w-[300px] flex">
            <SideBar/>
            {loading?<Loading/>:
                <div className="w-full text-black dark:text-white px-2 md:px-10 pt-10">

                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 
                            className="text-xl font-semibold text-gray-900 dark:text-white">
                            <Link to={`mailto:${email.email}`}>
                                {email.email}
                            </Link>
                            <span className="text-gray-500 text-sm pl-2">{email.name}</span>
                        </h3>
                        <p>
                            {
                                new Date(email.sentAt).toLocaleString("en-ZA", {
                                    dateStyle: "short",
                                })
                            }
                        </p>
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
                    </div>
                </div>
            }
        </section>
    )
}

export default Email;