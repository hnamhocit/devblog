import { Avatar, Button } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import { FC, memo } from 'react'
import {
	AiFillGithub,
	AiOutlineComment,
	AiOutlineLike,
	AiOutlineLink,
	AiOutlineMail,
} from 'react-icons/ai'
import { BsNewspaper } from 'react-icons/bs'
import { FaBirthdayCake } from 'react-icons/fa'

import { User } from '@/types'

interface ProfileProps {
	user: User | undefined | null
	me?: boolean
}

const msg = 'This field has not been updated!'
const className = 'flex items-center gap-2 transition hover:text-blue-500'
const boxClassName =
	'p-3 bg-white border shadow-md rounded-md hover:shadow-lg cursor-pointer hover:scale-105 transition flex flex-col gap-3'

const Profile: FC<ProfileProps> = ({ user, me = true }) => {
	const boxes = [
		{ title: 'Currently learning', content: user?.learning ?? msg },
		{ title: 'Skills/Languages', content: user?.skillsAndLanguages ?? msg },
		{ title: 'Currently hacking on', content: user?.hackingOn ?? msg },
	]

	return (
		<>
			<div className='relative bg-white border rounded-md mt-[60px] pt-[88px] px-7 pb-9'>
				<div className='absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2'>
					<Link href={`/users/${user?.id}`}>
						<Avatar
							src={user?.photoURL as string}
							alt={user?.name}
							sx={{
								width: 120,
								height: 120,
							}}
						/>
					</Link>
				</div>

				{me && (
					<div className='absolute top-7 right-7'>
						<Link href={`/settings`}>
							<Button variant='contained'>Edit profile</Button>
						</Link>
					</div>
				)}

				<div className='flex flex-col items-center justify-center'>
					<div className='text-3xl font-bold'>{user?.name}</div>
					<div className='text-lg text-gray-500'>
						{user?.bio ?? msg}
					</div>

					<div className='flex items-center gap-7'>
						<div className='flex items-center gap-2'>
							<FaBirthdayCake />

							<span>
								Joined on{' '}
								{moment(user?.createdAt).format('DD/MM/YYYY')}
							</span>
						</div>

						<Link
							href={`mailto:${user?.email}`}
							className={className}>
							<AiOutlineMail />

							<span>{user?.email}</span>
						</Link>

						{user?.website && (
							<Link
								href={user.website}
								target='blank'
								className={className}>
								<AiOutlineLink />

								<span>{user.website}</span>
							</Link>
						)}

						{user?.github && (
							<Link
								href={user.github}
								target='_blank'
								className={className}>
								<AiFillGithub />

								<span>{user.github ?? msg}</span>
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-4 mt-7 gap-7'>
				{boxes.map((box, i) => (
					<div key={i} className={boxClassName}>
						<div className='text-xl font-bold'>{box.title}</div>
						<div className='text-sm text-gray-500'>
							{box.content}
						</div>
					</div>
				))}

				<div className={boxClassName}>
					<div className='text-xl font-bold'>Activities</div>

					<div className='flex items-center gap-2'>
						<BsNewspaper />

						<div className='text-sm text-gray-500'>
							{user?.posts.length} posts published
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<AiOutlineComment />

						<div className='text-sm text-gray-500'>
							{user?.comments.length} comments written
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<AiOutlineLike />

						<div className='text-sm text-gray-500'>
							{user?.likes.length} likes
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(Profile)
