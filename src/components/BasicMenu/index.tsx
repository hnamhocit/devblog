import { IconButton } from '@mui/material'
import { FC, ReactNode, memo, useEffect, useRef, useState } from 'react'

interface BasicMenuProps {
	children: ReactNode
	btnIcon: ReactNode
	btnSize?: 'large' | 'medium' | 'small'
}

const BasicMenu: FC<BasicMenuProps> = ({
	children,
	btnIcon,
	btnSize = 'small',
}) => {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				open &&
				ref.current &&
				!ref.current.contains(e.target as Node)
			) {
				setOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open])

	return (
		<div className='relative' ref={ref}>
			<IconButton onClick={() => setOpen((prev) => !prev)} size={btnSize}>
				{btnIcon}
			</IconButton>

			<div
				className='absolute right-0 z-10 p-3 min-w-[240px] transition-all translate-y-2 bg-white border rounded-md shadow-lg top-full'
				style={{
					visibility: open ? 'visible' : 'hidden',
					opacity: open ? 1 : 0,
				}}>
				{children}
			</div>
		</div>
	)
}

export default memo(BasicMenu)
