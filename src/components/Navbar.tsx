import { NavLink, useLocation } from 'react-router-dom'
import { useMealUI } from '@/app/contexts/MealUIContext'

export default function Navbar() {
    const { pathname } = useLocation()
    const { openCreate } = useMealUI()

    const isMealsPage = pathname === '/meals'

    const links = ['dashboard', 'meals', 'settings', 'goal', 'trainings']

    return (
        <nav className="navbar">
            {links.map((link) => {
                const isMeals = link === 'meals'

                return (
                    <NavLink
                        key={link}
                        to={'/' + link}
                        className={({ isActive }) =>
                            isActive ? 'nav_link-active' : 'nav_link'
                        }
                    >
                        {isMeals && isMealsPage ? (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                    openCreate()
                                }}
                            >
                                +
                            </button>
                        ) : (
                            link
                        )}
                    </NavLink>
                )
            })}
        </nav>
    )
}
