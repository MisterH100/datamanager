import {useState } from "react";
import axios from 'axios';
import { useGlobalContext } from "../utils/globalContext";
import { SideBar } from "../components/sidebar";
import { RichTextEditor } from "../components/RichTextEditor";

export interface IBlogData{
    title: string;
    description: string;
}
const Blog = () => {
    const {loading,setLoading,user} = useGlobalContext();
    const [blogData, setBlogData] = useState({} as IBlogData)
    const [isShort, setisShort] = useState(true)
    const [published, setPublished] = useState(false)
    const [value, setValue] = useState("")
    const [curr, setCurr] = useState<number>();
    const name = user.name+ " "+ user.surname;

    const HandleChange = (e:any) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        })
        setValue(e.target.name== "blog"? e.target.value: value);
        setisShort(true)

    }
    const HandleBlur = (e: React.FocusEvent<HTMLTextAreaElement>)=>{
        setCurr(e.target.selectionStart)
    }
    const addValue = (e:any)=>{
        e.preventDefault()
        setValue((prev)=> prev.slice(0, curr) + e.target.value + prev.slice(curr))
    }

    const VerifyBlog=(e: React.FormEvent)=>{
        e.preventDefault()
        if(value.length < 500){
            setisShort(false)
            return
        }
        else{
            HandleSubmit(e)
        }
    }

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios.post("https://misterh-api-server.onrender.com/api/blogs/new", {
            name: name,
            title: blogData.title,
            description: blogData.description,
            blog: value,
            publisher: user.email,

        },
        {headers: {
            'Content-Type': 'application/json'
        }})
        .then((response) =>{
            console.log("Blog published: ",response.status);
            setLoading(false);
            setPublished(true)
            setTimeout(()=>{
                window.location.reload()
            },3000)
        })
        .catch((error) =>{
            console.log(error);
            setLoading(false);
        });
        

    }

    return (
        <section className="w-full  min-w-[300px] text-black dark:text-white flex">
            <SideBar/>
            <div className="w-full min-h-screen md:px-10 pt-10">
                {published?
                <div className="alert alert-success my-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Your blog has been Published!</span>
                </div>: null}
                <form className="flex flex-col w-full">
                    <div className="w-full flex flex-col md:flex-row bg-base-300 rounded-box min-w-full py-20 px-2 md:px-10">
                        <label 
                            htmlFor="name" 
                            className="flex flex-col">
                            <input
                                id="name"
                                name="name" 
                                type="text"
                                autoComplete="true"
                                required
                                defaultValue={`${user.name} ${user.surname}`}
                                placeholder="Name and Surname"
                                className="input input-bordered w-full mt-4"
                                onChange={HandleChange}
                                disabled
                            />
                        </label>
                        <div className="w-full flex justify-center md:justify-end items-center pt-8 md:pt-0">
                            <button
                                onClick={VerifyBlog}
                                className="btn btn-outline"
                            >
                                    Publish
                                    {loading?<span className="loading loading-dots loading-sm"></span>:null}
                            </button>
                        </div>
                    </div> 

                    <div className="divider"></div>

                    <div className="w-full h-auto bg-base-300 rounded-box min-w-full py-20 px-2 md:px-10">
                        <label htmlFor="title" className="flex flex-col">
                            <input
                                id="title"
                                name="title" 
                                type="text"
                                min={100}
                                required
                                maxLength={200} 
                                placeholder="Blog Title" 
                                className="input input-bordered w-full mt-4 mb-10"
                                onChange={HandleChange}
                            />
                        </label>
                        <label htmlFor="description" className="flex flex-col">
                            <input
                                id="description"
                                name="description" 
                                type="text"
                                required
                                maxLength={300}
                                placeholder="Blog Description" 
                                className="input input-bordered w-full min-w-xs mt-4 mb-10"
                                onChange={HandleChange}
                            />
                        </label>
                        <RichTextEditor HandleBlur={HandleBlur} HandleChange={HandleChange} value={value} isShort={isShort} addValue={addValue}/>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Blog;