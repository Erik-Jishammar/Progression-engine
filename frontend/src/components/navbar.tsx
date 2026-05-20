import "../styles/navbar.css"
import { NavLink } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">Progression engine</h2>
            <div className="navbar-links">

                <NavLink to="/" className={({ isActive }) => `navbar-btn ${isActive ? "active" : ""}`}> Dashboard</NavLink>


                <NavLink to="/workout" className={({ isActive }) => `navbar-btn ${isActive ? "active" : ""}`}>Workout</NavLink>
            </div>


        </nav>

    )
}