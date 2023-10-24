import { HomeLinks } from "../components/homeLinks"
import { SideBar } from "../components/sidebar";



const Home = ()=>{
    return(
        <section className="w-full min-h-screen bg-base-100 flex">
            <SideBar/>
            <div className="w-full pt-10">
                <div className="w-full h-fit text-center text-black dark:text-white">
                    <h1 className="text-5xl font-bold">Welcome to DataManager</h1>
                    <p>Manage all the data from your different apps in one place</p>
                </div>
                <HomeLinks/>
            </div>
                
        </section>
    )
}   

export default Home;