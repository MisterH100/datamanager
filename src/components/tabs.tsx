import { NavLink } from "react-router-dom"
import { useGlobalContext } from "../utils/globalContext";

const Tabs = () => {
    const {user} = useGlobalContext();
    return (
        <section className="sticky top-20 z-10 hero h-[100px] min-w-[300px] bg-base-100">
            <div className="tabs">
                {user.admin == true?
                    <NavLink
                        to="/emails"
                        className={({ isActive }) => (isActive ? 'tab-active tab tab-bordered ' : 'tab tab-bordered ')}
                    >   Emails
                    </NavLink>: null
                }
                <NavLink
                    to="/publish"
                    className={({ isActive }) => (isActive ? 'tab-active tab tab-bordered ' : 'tab tab-bordered ')}
                >   Publish
                </NavLink>

                <NavLink
                    to="/publish"
                    className={({ isActive }) => (isActive ? 'tab-active tab tab-bordered ' : 'tab tab-bordered ')}
                >   Form
                </NavLink>
            </div>
        </section>
    )
}

export default Tabs;