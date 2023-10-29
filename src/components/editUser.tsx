import { useState } from "react";
import { ILogin, useGlobalContext } from "../utils/globalContext";
import axios from "axios";

interface IFile{
    preview: string;
    file: File;
}
export const EditUser = ({editRef}:{editRef: any}) =>{
    const [loading, setLoading] = useState(false);
    const [newUserName, setNewUserName] = useState<ILogin>({} as  ILogin);
    const [file, setFile] = useState({} as IFile);
    const [updateImage, setUpdateImage] = useState(false);
    const [status, setStatus] = useState("");
    const {setIsAuthenticated,user} = useGlobalContext();

    const handleChange =(e:any)=>{
        setNewUserName({...newUserName, [e.target.name]: e.target.value});
    }

    const handleImageChange =(e:any)=>{
        setFile({
            ...file, 
            preview:URL.createObjectURL(e.target.files[0]), 
            file: e.target.files[0]
        }
        )
    }

    const HandleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) =>{
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

    const updateProfileImage = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("profileImage", file.file);
        console.log(formData.get("profileImage"))
        try {
            setLoading(true)
            await axios.put(`https://misterh-api-server.onrender.com/api/profile/${user._id}`,
            formData,
            {headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then((response: any) =>{
                setStatus(response.data)
                setLoading(false);
            })
            
        }catch (error: any) {
            setStatus(error.response.data);
            setLoading(false);
        }
        
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
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-center">
                                <div className="avatar mb-2">
                                    <div className="rounded-full w-20 h-20">
                                        <img 
                                            src={file.preview?file.preview: user.profileImage.image_url} 
                                            alt={user.username}
                                        />
                                    </div>
                                </div>
                            </div>
                            {!updateImage?
                                <button 
                                    className="btn"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        setUpdateImage(true)
                                    }
                                    }
                                    >
                                    update image
                                </button>:null
                            }                           
                        </div>

                    
                        {updateImage?

                            <div className="form-control mt-6 gap-y-2">
                                <input 
                                    type="file"
                                    required
                                    onChange={handleImageChange}
                                    className="file-input file-input-bordered file-input-info w-full" 
                                />
                                <button
                                    onClick={updateProfileImage}
                                    className="btn btn-primary"
                                    disabled={loading?true:false}
                                >
                                    {
                                        loading?
                                        <span className="loading loading-spinner"></span>:
                                        "update"
                                    }
                                </button>
                                <p className="w-full text-red-500 text-center">{status}</p>
                            </div>
                            :
                            <>
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
                            </>
                        }
                    </form>
                </div>
            </div>
        </dialog>
    )
}