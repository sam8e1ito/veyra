import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const links = ['dashboard', 'meals', 'settings', 'goal', 'trainings']

    return (
        <nav className="navbar">
            {links.map((link) => (
                <NavLink
                    key={link}
                    to={'/' + link}
                    className={({ isActive }) =>
                        isActive ? 'nav_link-active' : 'nav_link'
                    }
                >
                    {link}
                </NavLink>
            ))}
        </nav>
    )
}
