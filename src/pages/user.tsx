import { useGlobalContext } from "../utils/globalContext";
import { Loading } from "../components/loading";
import { SideBar } from "../components/sidebar";
import { EditUser } from "../components/editUser";
import { useRef } from "react";


export const UserPage = () =>{
    const {loading,logOut,user} = useGlobalContext();
    const editRef = useRef<HTMLDialogElement>(null)

    const getDate = (date: Date) =>{
        return new Date(date).toLocaleString('en-Za', {dateStyle: "short"});
    }
    const showModal =()=>{
        editRef.current?.showModal();
    }

    return(
        <section className="relative w-full min-h-screen flex">
            <SideBar/>
            <div className="relative w-full px-2 md:px-20 pt-10 min-h-screen">
                <EditUser editRef={editRef}/>
                {loading?<Loading/>:
                    <div className="bg-base-100 overflow-hidden shadow rounded-lg border border-gray-500">
                        <div className="px-4 py-5 sm:px-6 flex justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-black dark:text-white">
                                    Hi!
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 flex items-center gap-4">
                                    {user.username}
                                    <span
                                        onClick={showModal}
                                        role="edit-button" 
                                        className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                        height="1em" 
                                        viewBox="0 0 512 512"
                                        stroke="currentColor"
                                        fill="#7FFF00"
                                        >
                                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                                        </svg>
                                    </span>
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
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Role
                                    </dt>
                                    <dd className="mt-1 text-sm text-black dark:text-white sm:mt-0 sm:col-span-2">
                                        {user.role}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="w-full py-4 flex justify-center border-t border-gray-200">
                            <button 
                                className="btn"
                                onClick = {logOut}
                                >log out
                            </button>
                        </div>
                    </div>
                }
            </div>
            
        </section>
    )
}