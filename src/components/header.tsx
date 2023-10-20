import { Link } from "react-router-dom";
import { useGlobalContext } from "../utils/globalContext";
import { useRef } from "react";



const Header = () => {
    const {user,isLoggedIn,setIsLoggedIn} = useGlobalContext();
    const modalRef = useRef<HTMLDialogElement>(null);
    const showModal =()=>{
        modalRef.current?.showModal();
    }
    return (
        <header className="sticky top-0 z-40 navbar bg-base-100 border-b border-slate-500 ">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">data manager</a>
            </div>
            {isLoggedIn?
                <div className="dropdown dropdown-end cursor-pointer">
                    <label tabIndex={0}>
                        <div className="avatar placeholder cursor-pointer">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                <span className="text-xl">
                                    {user.username.slice(0,1)}
                                </span>
                            </div>
                        </div>
                    </label> 
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <Link to={"/"}>Profile</Link>
                    </li>
                    <li>
                        <button
                            onClick={()=>setIsLoggedIn(false)}
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
                            <h3 className="font-bold text-lg">How to create an account</h3>
                            <p className="py-4">To create an account you will be redirected to the collab page, in the collab page you request to create an insights account by filling in the form click on register to continue </p>
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