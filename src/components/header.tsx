import { Link } from "react-router-dom";
import {useGlobalContext } from "../utils/globalContext";
import { useRef } from "react";
import { ProgressBar } from "./loadingBar";


const Header = () => {
    const {user,logOut,isAuthenticated} = useGlobalContext();
    const modalRef = useRef<HTMLDialogElement>(null);
    const showModal =()=>{
        modalRef.current?.showModal();
    }

    return (
        <header className="sticky top-0 z-40 navbar bg-base-100 border-b border-slate-500 ">
            <ProgressBar/>
            <div className="flex-1 text-black dark:text-white">
                <Link to={"/"} className="normal-case text-xl">data manager</Link>
            </div>
            {isAuthenticated?
                <div className="dropdown dropdown-end cursor-pointer">

                    <div tabIndex={0} title={user.username}>
                        <div className="avatar placeholder cursor-pointer">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                <span className="text-xl">
                                    {user.username.charAt(0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black dark:text-white">
                        <li className="mb-2">
                            <Link to={`/user/${user._id}`}>{user.username}</Link>
                        </li>
                        <li>
                            <button
                                onClick={logOut}
                                className="btn btn-sm">Log out
                            </button>
                        </li>
                    </ul>
                </div>:
                <div>
                    <button
                        onClick={showModal} 
                        className="btn btn-primary">create account
                    </button>
                    <dialog
                        ref={modalRef}
                        className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-black dark:text-white">How to create an account</h3>
                            <p className="py-4 text-black dark:text-white">To create an account you will be redirected to the collab page, in the collab page you request to create an insights account by filling in the form click on register to continue </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                                <Link to={"https://thehandsomedev.com/collab"} target="_blank" className="btn btn-primary">Register</Link>
                            </div>
                        </div>
                    </dialog>
                </div>
            }
        </header>
    )
}

export default Header;