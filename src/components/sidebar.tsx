import { NavLink } from "react-router-dom"
import { useGlobalContext } from "../utils/globalContext"



export const SideBar = () =>{
    const {user} = useGlobalContext()

    return(
        <div className="hidden md:block md:w-1/3 min-h-screen bg-base-200 border-r border-slate-500">
            <ul className="menu p-4 w-full min-h-full text-base-content">
                {user.admin?
                    <>
                    <li>
                        <NavLink 
                            to="/"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/emails"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >Emails
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/publish"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >Publish
                        </NavLink>
                    </li>

                    </>:
                    <>
                    <li>
                        <NavLink 
                            to="/"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="https://insights-blogs.vercel.app/"
                            target="_blank"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >Insights
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="https://cqp-product-shop.vercel.app/"
                            target="_blank"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >CQP
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="https://thehandsomedev.com"
                            target="_blank"
                            className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                            >Portfolio
                        </NavLink>
                    </li>

                    </>

                }
                <span className="divider"></span>
                <li>
                    <NavLink 
                        to={"/user"}
                        className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                        >User profile
                    </NavLink>
                </li>
            </ul>

        </div>
    )
}