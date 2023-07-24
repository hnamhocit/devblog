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
	const menuRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open])

	const toggleOpen = () => setOpen(!open)

	return (
		<div className='relative'>
			<IconButton onClick={toggleOpen} size={btnSize}>
				{btnIcon}
			</IconButton>

			<div
				ref={menuRef}
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
