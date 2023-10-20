import { HomeLinks } from "../components/homeLinks"



const Home = ()=>{
    return(
        <section className="fixed top-0 z-20 left-0 w-full h-screen bg-base-100">
            <div className="w-full h-fit text-center pt-40">
                <h1 className="text-5xl font-bold">Welcome to DataManager</h1>
                <p>Manage all the data from your different apps in one place</p>
            </div>
            <HomeLinks/>
        </section>
    )
}   

export default Home;