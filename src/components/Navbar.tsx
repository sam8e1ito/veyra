import { NavLink, useLocation } from 'react-router-dom'
import { useDailyProgress } from '@/hooks/useDailyProgress'

export default function Navbar() {
    const { pathname } = useLocation()
    const { addMeal } = useDailyProgress()

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

                                    addMeal({
                                        calories: 500,
                                        carbs: 30,
                                        fats: 20,
                                        protein: 30,
                                        createdAt: Date.now(),
                                        id: '12ds',
                                        title: 'burger',
                                    })
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
