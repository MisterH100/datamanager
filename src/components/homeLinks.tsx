import { Link } from "react-router-dom"
import { useGlobalContext } from "../utils/globalContext"



export const HomeLinks =()=>{
    const {user} = useGlobalContext();
    const isAdmin = user.admin;

    return(
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
            {isAdmin?
                <>
                    <Link to={"/emails" } className="w-full md:w-96 h-fit bg-base-100 shadow-xl border border-gray-500 hover:bg-base-200">
                        <div className="card-body">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Emails
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Read, reply and Delete contact emails from your portfolio</p>
                        </div>
                    </Link>
                    <Link to={"/publish" } className="w-full md:w-96 h-fit bg-base-100 shadow-xl border border-gray-500 hover:bg-base-200">
                    <div className="card-body">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Publish Blogs</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Publish your creative blogs for Insghts blogging app</p>
                    </div>
                    </Link>

                    <Link to={"/user"} className="w-full md:w-96 h-fit bg-base-100 shadow-xl border border-gray-500 hover:bg-base-200">
                    <div className="card-body">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">User profile</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">view user profile, edit and change username</p>
                    </div>
                    </Link>
                </>:
                <>
                    <Link to={"https://insights-blogs.vercel.app" } className="w-full md:w-96 h-fit bg-base-100 shadow-xl border border-gray-500 hover:bg-base-200">
                        <div className="card-body">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Read Blogs
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Check out insights blogging app and,sign up for collaboration and publish your own blogs</p>
                        </div>
                    </Link>

                    <Link to={"https://thehandsomedev.com"} className="w-full md:w-96 h-fit bg-base-100 shadow-xl border border-gray-500 hover:bg-base-200">
                        <div className="card-body">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Portfolio
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Visit my portfolio website,take a look at the projects i have worked on</p>
                        </div>
                    </Link>
                </>
            }

            
        </div>
    )
}