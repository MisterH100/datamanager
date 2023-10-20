import axios from "axios"
import {useGlobalContext } from "../utils/globalContext"
import { useState } from "react";



export const Login = ()=>{
    const {login,setLogin,setUser,setIsLoggedIn} = useGlobalContext();
    const [status, setStatus] = useState("");
    const [loading,setLoading] = useState(false);
    
    const handleChange =(e:any)=>{
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const HandleSubmit = async (e: any) =>{
        e.preventDefault()
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
                setIsLoggedIn(true)
                setLoading(false)
            })
        } catch (error: any) {
            console.log(error.response.data);
            setStatus(error.response.data);
            setLoading(false)
        }
    }
    
    return(
        <div className="hero h-screen bg-base-200">
            <div className="hero-content flex-col w-full">
                <div className="w-full text-center">
                    <h1 className="text-5xl font-bold">Login</h1>
                </div>
                <div className="card w-full md:w-1/2 shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
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
                        <div className="form-control">
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
    )
}