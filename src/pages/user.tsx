import { useParams } from "react-router";
import { useGetUser } from "../utils/useGetUser";
import { useGlobalContext } from "../utils/globalContext";
import { Loading } from "../components/loading";


export const UserPage = () =>{
    const {userId} = useParams();
    const {loading,logOut} = useGlobalContext();
    const user = useGetUser(userId);

    const getDate = (date: Date) =>{
        return new Date(date).toLocaleString('en-Za', {dateStyle: "short"});
    }

    return(
        <section className="relative w-full min-h-screen md:px-10">
            {loading?<Loading/>:
                <div className=" bg-base-100 overflow-hidden shadow rounded-lg border mt-20 border-gray-500">
                    <div className="px-4 py-5 sm:px-6 flex justify-between">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-black dark:text-white">
                                User
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {user.username}
                            </p>
                        </div>
                        <div>
                            <div className="avatar online placeholder cursor-pointer">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                    <span className="text-xl">
                                        {user.username?.charAt(0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-black dark:text-white sm:mt-0 sm:col-span-2">
                                    {user.name} {user.surname}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd className="mt-1 text-sm text-black dark:text-white sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    joined
                                </dt>
                                <dd className="mt-1 text-sm text-black dark:text-white sm:mt-0 sm:col-span-2">
                                    {getDate(user.createdAt)}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Status
                                </dt>
                                <dd className="mt-1 text-sm text-black dark:text-white sm:mt-0 sm:col-span-2">
                                    {user.admin? "Admin": "Visitor" }
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            }
            <div className="w-full pt-10">
                <button 
                    className="btn"
                    onClick = {logOut}
                    >log out
                </button>
            </div>
        </section>
    )
}