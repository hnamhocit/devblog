import { Avatar, Button, Divider } from '@mui/material'
import Link from 'next/link'
import { BiUserCircle } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'

import BasicMenu from '@/components/BasicMenu'
import { useAuth } from '@/hooks/useAuth'
import { AiOutlinePlus } from 'react-icons/ai'

const Actions = () => {
	const { user, isLoggedIn, logout } = useAuth()

	return (
		<div className='flex items-center gap-5'>
			{isLoggedIn ? (
				<>
					<Link href='/posts/create' className='hidden md:block'>
						<Button variant='outlined'>Create Post</Button>
					</Link>

					<BasicMenu
						btnIcon={
							<Avatar
								src={user?.photoURL || ''}
								alt={user?.name}
							/>
						}>
						<div className='flex flex-col gap-3'>
							<div className='text-lg font-medium'>
								Hi, {user?.name} 👋
							</div>

							<Divider />

							<Link
								href={`/users/${user?.id}`}
								className='flex items-center gap-2 text-gray-700 transition hover:text-blue-500'>
								<BiUserCircle size={20} />

								<span>Profile</span>
							</Link>

							<Link
								href='/settings'
								className='flex items-center gap-2 text-gray-700 transition hover:text-blue-500'>
								<FiSettings size={20} />
								<span>Settings</span>
							</Link>

							<Link
								href='/settings'
								className='flex items-center gap-2 text-gray-700 transition md:hidden hover:text-blue-500'>
								<AiOutlinePlus size={20} />
								<span>Create post</span>
							</Link>

							<Divider />

							<Button onClick={logout} fullWidth color='error'>
								Logout
							</Button>
						</div>
					</BasicMenu>
				</>
			) : (
				<>
					<Link href='/enter'>
						<Button variant='outlined'>Login</Button>
					</Link>

					<Link href='/enter?state=new-user'>
						<Button variant='contained'>Sign up</Button>
					</Link>
				</>
			)}
		</div>
	)
}

export default Actions
