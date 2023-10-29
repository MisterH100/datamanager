import { useState } from "react";
import { ILogin, useGlobalContext } from "../utils/globalContext";
import axios from "axios";


export const EditUser = ({editRef}:{editRef: any}) =>{
    const [loading, setLoading] = useState(false);
    const [newUserName, setNewUserName] = useState<ILogin>({} as  ILogin);
    const [status, setStatus] = useState("");
    const {setIsAuthenticated,user} = useGlobalContext();

    const handleChange =(e:any)=>{
        setNewUserName({...newUserName, [e.target.name]: e.target.value});
    }

    const HandleSubmit = async (e: any) =>{
        e.preventDefault()
        if(newUserName.email != null){
            setLoading(true)
            try {
                
                await axios.put(`https://misterh-api-server.onrender.com/api/user/update-user/${user._id}`, {
                    username: newUserName.email,
                    password: newUserName.password
                },
                {headers: {
                    'Content-Type': 'application/json'
                }})
                .then((response: any) =>{
                    setIsAuthenticated(true);
                    setStatus(response.data)
                    setLoading(false);
                    window.location.reload();
                })
            } catch (error: any) {
                setStatus(error.response.data);
                setLoading(false);
            }
        }
        setLoading(false)
    }

    return(
        <dialog 
            ref={editRef}
            className="modal modal-bottom sm:modal-middle">
            <div className="modal-box hero-content flex-shrink-0 flex-col">
                <form method="dialog" className="w-full flex justify-end">
                    <button 
                        className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form>
                <div className="card w-full">
                    <form className="card-body">
                        <div className="form-control text-black dark:text-white">
                            <label 
                                htmlFor="username" 
                                className="label">
                                <span className="label-text">New username</span>
                            </label>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                onChange={handleChange}
                                placeholder="new username"
                                autoComplete="true"
                                className="input input-bordered" 
                                required 
                            />
                        </div>
                        <div className="form-control text-black dark:text-white">
                            <label 
                                htmlFor="password"
                                className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="password" 
                                className="input input-bordered" 
                                required 
                            />
                                
                        </div>
                        <div className="form-control mt-6">
                            <button 
                                className="btn btn-primary"
                                disabled={loading?true:false}
                                onClick={HandleSubmit}
                                >
                                    {
                                        loading?
                                        <span className="loading loading-spinner"></span>:
                                        "confirm"
                                    }
                            </button>
                            <p className="w-full text-red-500 text-center">{status}</p>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}