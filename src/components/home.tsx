import { NavLink } from "react-router-dom"

const Home = () => {
    return (
        <section className="hero h-[100px] min-w-[300px] ">
            <div className="tabs">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'tab-active tab tab-bordered ' : 'tab tab-bordered ')}
                >Emails</NavLink>
                <NavLink
                    to="/form"
                    className={({ isActive }) => (isActive ? 'tab-active tab tab-bordered ' : 'tab tab-bordered ')}
                >Form</NavLink>
                <NavLink
                    to="/data"
                    className={({ isActive }) => (isActive ? 'tab-active tab tab-bordered ' : 'tab tab-bordered ')}
                >Form</NavLink>
            </div>
        </section>
    )
}

export default Home;