import { NavLink, useLocation } from 'react-router-dom'
import { useMealUI } from '@/app/contexts/MealUIContext'

export default function Navbar() {
    const { pathname } = useLocation()
    const { openCreate } = useMealUI()

    const isMealsPage = pathname === '/meals'

    const links = [
        { label: 'dashboard', to: '/' },
        { label: 'meals', to: '/meals' },
        { label: 'settings', to: '/settings' },
        { label: 'goal', to: '/goal' },
        { label: 'trainings', to: '/trainings' },
    ]

    return (
        <nav className="navbar">
            {links.map(({ label, to }) => {
                const isMeals = label === 'meals'

                return (
                    <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                            isActive ? 'nav_link-active' : 'nav_link'
                        }
                        end={to === '/'}
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
                            label
                        )}
                    </NavLink>
                )
            })}
        </nav>
    )
}
