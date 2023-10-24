import { Link } from "react-router-dom"



export const Footer = ()=>{
    return(
        <footer className="footer items-center p-4  bg-base-100 border-t border-slate-500  text-neutral-content">
            <aside className="items-center grid-flow-col text-black dark:text-white">
                <h1>data manager</h1>
                <p>Copyright © 2023 - All right reserved</p>
            </aside> 
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-black dark:text-white">
                <Link to="https://thehandsomedev.com" target="_blank" className="link link-hover underline">thehandsomedev.com</Link> 
                <Link to="https://insights-blogs.vercel.app" target="_blank" className="link link-hover underline">insights blogging</Link> 
                <Link to="https://cqp-product-shop.vercel.app" target="_blank" className="link link-hover underline">cqp product shop</Link> 
            </nav>
        </footer>
    )
} 