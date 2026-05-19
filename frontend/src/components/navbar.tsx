import "../styles/navbar.css"
import { NavLink } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">Progression engine</h2>
            <div className="navbar-links">

                <NavLink to="/" className={({ isActive }) => `navbar-btn ${isActive ? "active" : ""}`}> Dashboard</NavLink>


                <NavLink to="/exercises" className={({ isActive }) => `navbar-btn ${isActive ? "active" : ""}`}>Exercises</NavLink>
            </div>


        </nav>

    )
}