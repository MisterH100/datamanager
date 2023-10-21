import axios from "axios"
import {useGlobalContext } from "../utils/globalContext"
import { useState } from "react";



export const Login = ()=>{
    const {login,setLogin,setUser,setLocalUser} = useGlobalContext();
    const [status, setStatus] = useState("");
    const [loading,setLoading] = useState(false);
    
    const handleChange =(e:any)=>{
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const HandleSubmit = async (e: any) =>{
        e.preventDefault()
        if(login.username != null){
            setLoading(true)
            try {
                
                await axios.post("https://misterh-api-server.onrender.com/api/login", {
                    username: login.username,
                    password: login.password
                },
                {headers: {
                    'Content-Type': 'application/json'
                }})
                .then((response: any) =>{
                    setUser(response.data)
                    setLocalUser(response.data)
                    setLoading(false)
                })
            } catch (error: any) {
                console.log(error.response.data);
                setStatus(error.response.data);
                setLoading(false)
            }
        }
        setLoading(false)
    }
    
    return(
        <div className="w-full hero min-h-screen bg-base-200">
            <div className="w-full hero-content p-1 md:p-4 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-full md:max-w-lg text-black dark:text-white">
                    <h1 className="text-5xl font-bold">data manager</h1>
                    <p className="py-6">By logging in to data manager you have a control center form all your web applications you can add items, remove and modify your data in your databse, data manager gives a more easy way to manage your data</p>
                </div>
                <div className="hero-content flex-shrink-0 flex-col w-full md:w-1/2">
                    <div className="w-full text-center text-black dark:text-white">
                        <h1 className="text-5xl font-bold">Login</h1>
                    </div>
                    <div className="card w-full shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control text-black dark:text-white">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input 
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    placeholder="username" 
                                    className="input input-bordered" 
                                    required 
                                />
                            </div>
                            <div className="form-control text-black dark:text-white">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="password" 
                                    className="input input-bordered" 
                                    required 
                                />
                                {
                                    /*
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                    */
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button 
                                    className="btn btn-primary"
                                    onClick={HandleSubmit}
                                    >
                                        {
                                            loading?
                                            <span className="loading loading-spinner"></span>:
                                            "Log in"
                                        }
                                </button>
                                <p className="w-full text-red-500 text-center">{status}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}