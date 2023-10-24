import { Link, NavLink } from "react-router-dom"
import { useGlobalContext } from "../utils/globalContext"
import { SetStateAction} from "react";



export const Drawer = ({isOpen,setIsOpen}:{isOpen:boolean,setIsOpen:React.Dispatch<SetStateAction<boolean>>}) =>{
    const {user} = useGlobalContext();

    return(
        <div 
            style={{display:isOpen? "block": "none"}}
            className="absolute top-0 left-0 w-1/2 min-w-max md:hidden min-h-screen bg-base-200 border-r border-slate-500">
            <div className="flex items-center w-full h-20 p-2 text-black dark:text-white">
                <Link to={"/"} className="flex-1 normal-case text-xl pl-4">data manager</Link>
                <button 
                    onClick={()=>setIsOpen(!isOpen)}
                    className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
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
                        to={`/user/${user._id}`}
                        className={({isActive}) => isActive? "text-blue-500": "text-black dark:text-white"}
                        >User profile
                    </NavLink>
                </li>
            </ul>

        </div>
        
    )
}