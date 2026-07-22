import { useLocation, useNavigate } from 'react-router-dom'
import { useMealUI } from '@/app/contexts/MealUIContext'
import DashboardIcon from '@/assets/icons/dashboard.svg?react'
import MealsIcon from '@/assets/icons/meals.svg?react'
import SettingsIcon from '@/assets/icons/settings.svg?react'
import GoalIcon from '@/assets/icons/goal.svg?react'
import TrainingsIcon from '@/assets/icons/dumbbell.svg?react'
import clsx from 'clsx'
import Icon from './Icon'
import AddIcon from '@/assets/icons/add.svg?react'

const links = {
    dashboard: {
        label: 'dashboard',
        to: '/',
        icon: DashboardIcon,
    },
    goal: {
        label: 'goal',
        to: '/goal',
        icon: GoalIcon,
    },
    trainings: {
        label: 'trainings',
        to: '/trainings',
        icon: TrainingsIcon,
    },
    meals: {
        label: 'meals',
        to: '/meals',
        icon: MealsIcon,
    },
    settings: {
        label: 'settings',
        to: '/settings',
        icon: SettingsIcon,
    },
}

const navbarOrders = {
    '/': [
        links.goal,
        links.trainings,
        links.dashboard,
        links.meals,
        links.settings,
    ],

    '/goal': [
        links.dashboard,
        links.trainings,
        links.goal,
        links.meals,
        links.settings,
    ],

    '/trainings': [
        links.goal,
        links.dashboard,
        links.trainings,
        links.meals,
        links.settings,
    ],

    '/meals': [
        links.goal,
        links.trainings,
        links.meals,
        links.dashboard,
        links.settings,
    ],

    '/settings': [
        links.goal,
        links.trainings,
        links.settings,
        links.meals,
        links.dashboard,
    ],
}

export default function Navbar() {
    const { pathname } = useLocation()

    const normalizedPath = (() => {
        if (pathname.startsWith('/trainings')) return '/trainings'
        if (pathname.startsWith('/meals')) return '/meals'
        if (pathname.startsWith('/goal')) return '/goal'
        if (pathname.startsWith('/settings')) return '/settings'

        return '/'
    })()

    const isMealsPage = normalizedPath === '/meals'

    const navigate = useNavigate()
    const { openCreate } = useMealUI()

    const currentOrder = navbarOrders[normalizedPath]

    return (
        <nav
            className="
                fixed bottom-0 left-1/2
                -translate-x-1/2
                flex items-center
                gap-[clamp(6px,2vw,12px)]
                rounded-t-[52px]
                bg-bg-secondary
                px-[clamp(12px,4vw,24px)]
                py-3
                pb-[calc(env(safe-area-inset-bottom)+16px)]
                border border-b-0 border-border-accent
                z-10
            "
        >
            {currentOrder.map(({ label, to, icon }, index) => {
                const isActive = index === 2
                const isMeals = label === 'meals'

                return (
                    <button
                        key={label}
                        onClick={() => {
                            if (isMeals && isActive) {
                                openCreate()
                                return
                            }

                            navigate(to)
                        }}
                        className={clsx(
                            `
                            flex items-center justify-center 
                            rounded-full transition-all 
                            border border-accent
                            `,
                            isActive
                                ? `
                                size-[clamp(64px,18vw,80px)]
                                bg-accent
                                text-bg-primary
                                `
                                : `
                                size-[clamp(44px,13vw,56px)]
                                bg-border-accent
                                text-accent
                                `
                        )}
                    >
                        {isMeals && isMealsPage ? (
                            <Icon
                                icon={AddIcon}
                                size={isActive ? 'clamp(32px,10vw,44px)' : 24}
                            />
                        ) : (
                            <Icon
                                icon={icon}
                                size={isActive ? 'clamp(32px,10vw,44px)' : 24}
                            />
                        )}
                    </button>
                )
            })}
        </nav>
    )
}
