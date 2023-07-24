import { Typography } from '@mui/material'
import Link from 'next/link'

import Container from '../Container'
import Actions from './Actions'
import Search from './Search'

const Header = () => {
	return (
		<div className='sticky inset-x-0 top-0 z-20 h-16 bg-white border-b shadow-sm'>
			<Container className='flex items-center justify-between h-full'>
				<div className='flex items-center gap-3 md:gap-7'>
					<Typography
						variant='h6'
						fontWeight={700}
						className='hidden md:block'>
						<Link href='/'>Dev Blog</Link>
					</Typography>

					<Search />
				</div>

				<Actions />
			</Container>
		</div>
	)
}

export default Header
