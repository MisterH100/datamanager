import axios from "axios"
import {useGlobalContext } from "../utils/globalContext"
import {useState } from "react";
import { Link } from "react-router-dom";



export const Login = ()=>{
    const {recent,login,setLogin,setUser,setToken,setIsAuthenticated,setRecent} = useGlobalContext();
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange =(e:any)=>{
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const authUser = async() =>{
        setLoading(true)
        await axios.post("https://misterh-api-server.onrender.com/api/auth",{
            username: recent.username,
        },
        {headers: {
          'auth-token': recent.token,
        }}).then(response =>{
          setIsAuthenticated(response.data.authenticated);
          setUser(response.data.user);
          setLoading(false);
          setToken(recent.token)
        })
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
                    setUser(response.data.user);
                    setToken(response.data.token);
                    setIsAuthenticated(true);
                    setLoading(false);
                    setRecent({...recent,username: response.data.user.username, })

                })
            } catch (error: any) {
                console.log(error.response.data);
                setStatus(error.response.data);
                setLoading(false);
            }
        }
        setLoading(false)
    }


 
    return(
        <div className="w-full hero min-h-screen bg-base-200">
            <div className="w-full hero-content p-1 md:p-4 flex-col">
                    {recent.username != null?
                        <button
                            onClick={authUser}
                            className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                                <span className="text-3xl">{recent.username.charAt(0)}</span>
                            </div>
                        </button>:
                        null
                    }

                <div className="hero-content flex-shrink-0 flex-col w-full md:w-1/2">
                    <div className="w-full text-center text-black dark:text-white">
                        <h1 className="text-5xl font-bold">Login</h1>
                    </div>
                    <div className="card w-full shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control text-black dark:text-white">
                                <label 
                                    htmlFor="username" 
                                    className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={handleChange}
                                    placeholder="username"
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
                                    
                                <span
                                    className="label">
                                    <Link
                                        to="#" 
                                        className="label-text-alt link link-hover"
                                        >Forgot password?
                                    </Link>
                                </span>
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