import clsx from 'clsx'

type IconProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    size?: number | string
    className?: string
}

export default function Icon({ icon: Svg, size = 24, className }: IconProps) {
    return (
        <Svg
            width={size}
            height={size}
            className={clsx('shrink-0', className)}
        />
    )
}
