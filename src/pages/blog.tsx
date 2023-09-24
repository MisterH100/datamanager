import {useState } from "react";
import axios from 'axios';

const Blog = () => {
    const [blogData, setBlogData] = useState({
        name: "Handsome Nyathi",
        title: "",
        blog: ""
    })
    const [isName, setisName] = useState(true)
    const [isTitle, setisTitle] = useState(true)
    const [isShort, setisShort] = useState(true)
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(false)

    const HandleChange = (e:any) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        })
        blogData.name.length > 1 ?setisName(true): null;
        blogData.title.length > 1 ?setisTitle(true): null;
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
            blog: blogData.blog
        },
        {headers: {
            'Content-Type': 'application/json'
        }})
        .then((response) =>{
            console.log("Blog published: ",response.status);
            setTimeout(()=>{
                setLoading(false);
                setPublished(true)
            },3000);
            setTimeout(()=>{
                window.location.reload()
            },5000)
        })
        .catch((error) =>{
            console.log(error);
            setTimeout(()=>{
                setLoading(false);
            },3000);
        });
        

    }

    return (
        <section className="w-full px-1 md:px-60 min-w-[300px]">
            {published?
            <div className="alert alert-success my-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Your blog has been Published!</span>
            </div>: null}
            <form className="flex flex-col w-full">
                <div className="w-full flex flex-col md:flex-row bg-base-300 rounded-box min-w-full py-20 px-2 md:px-10">
                    <label htmlFor="name" className="flex flex-col">
                        {isName ?<span className="label-text">Name</span>:<span className="label-text text-red-600">can not publish without Name!!</span> }
                        <input
                            id="name"
                            name="name" 
                            type="text"
                            required
                            value={blogData.name}
                            placeholder="Name and Surname"
                            className="input input-bordered w-full max-w-xs mt-4"
                            onChange={HandleChange}
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
                            placeholder="Blog Title" 
                            className="input input-bordered w-full max-w-xs mt-4 mb-10"
                            onChange={HandleChange}
                        />
                    </label>
                    <label htmlFor="blog">
                        {!isShort ?<span className="label-text text-red-600 mt-20">can not publish without or less than 500 words of blog content!!</span>:null }
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