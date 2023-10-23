import {useState } from "react";
import axios from 'axios';
import { useGlobalContext } from "../utils/globalContext";

const Blog = () => {
    const {loading,setLoading} = useGlobalContext()
    const [blogData, setBlogData] = useState({
        name: "Handsome Nyathi",
        title: "",
        description: "",
        blog: ""
    })
    const {user} = useGlobalContext();
    const [isName, setisName] = useState(true)
    const [isTitle, setisTitle] = useState(true)
    const [isDesc, setisDesc] = useState(true)
    const [isShort, setisShort] = useState(true)
    const [published, setPublished] = useState(false)

    const HandleChange = (e:any) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        })
        blogData.name.length > 1 ?setisName(true): null;
        blogData.title.length > 1 ?setisTitle(true): null;
        blogData.description.length > 1 ?setisDesc(true): null;
        blogData.blog.length > 500 ?setisShort(true): null;

    }
    const VerifyBlog=(e: React.FormEvent)=>{
        e.preventDefault()
        if(!blogData.name){
            setisName(false)
        }
        if(!blogData.title){
            setisTitle(false)
        }
        if(!blogData.description){
            setisDesc(false)
        }
        if(blogData.blog.length < 500){
            setisShort(false)
        }
        else{
            HandleSubmit(e)
        }
    }

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios.post("https://misterh-api-server.onrender.com/api/blogs/new", {
            name: blogData.name,
            title: blogData.title,
            description: blogData.description,
            blog: blogData.blog
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
        <section className="w-full px-1 md:px-60 pt-20 min-w-[300px] text-black dark:text-white">
            
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
                        {isName ?<span className="label-text">Name</span>:<span className="label-text text-red-600">can not publish without Name!!</span> }
                        <input
                            id="name"
                            name="name" 
                            type="text"
                            autoComplete="true"
                            required
                            value={`${user.name} ${user.surname}`}
                            placeholder="Name and Surname"
                            className="input input-bordered w-full max-w-xs mt-4"
                            onChange={HandleChange}
                            disabled
                        />
                    </label>
                    <div className="w-full flex justify-center md:justify-end items-center pt-8">
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
                    {isTitle ?<span className="label-text">Blog Title</span>:<span className="label-text text-red-600">can not publish without Title!!</span> }
                        <input
                            id="title"
                            name="title" 
                            type="text"
                            required
                            maxLength={200} 
                            placeholder="Blog Title" 
                            className="input input-bordered w-full max-w-xs mt-4 mb-10"
                            onChange={HandleChange}
                        />
                    </label>
                    <label htmlFor="description" className="flex flex-col">
                    {isDesc ?<span className="label-text">Blog description</span>:<span className="label-text text-red-600">can not publish without Description!!</span> }
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
                    <label htmlFor="blog">
                        {!isShort ?<span className="label-text text-red-600 mt-20">can not publish without or less than 500 words of Blog Content!!</span>:null }
                        <textarea
                            id="blog"
                            name="blog"
                            rows={20}
                            required
                            className="textarea textarea-bordered textarea-lg w-full h-full mt-4"
                            onChange={HandleChange}
                            >
                        </textarea>
                    </label>
                
                </div>
            </form>
        </section>
    )
}

export default Blog;