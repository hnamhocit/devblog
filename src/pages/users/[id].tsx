import { Avatar, Button } from '@mui/material'
import moment from 'moment'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
	AiFillGithub,
	AiOutlineComment,
	AiOutlineLike,
	AiOutlineLink,
	AiOutlineMail,
} from 'react-icons/ai'
import { BsNewspaper } from 'react-icons/bs'
import { FaBirthdayCake } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Loading from '@/components/Loading'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/types'
import axiosClient from '../api/axiosClient'

const msg = 'This field has not been updated!'
const className = 'flex items-center gap-2 transition hover:text-blue-500'
const boxClassName =
	'p-3 bg-white border shadow-md rounded-md hover:shadow-lg cursor-pointer hover:scale-105 transition flex flex-col gap-3'

const UserProfile = () => {
	const router = useRouter()
	const { user } = useAuth()
	const { id } = router.query

	const [data, setData] = useState<User>()
	const [loading, setLoading] = useState(true)

	const fetchUser = useCallback(async () => {
		try {
			const rs = await axiosClient.get(`/users/${id}`)
			const { data, success, message } = rs.data

			if (!success) {
				setLoading(false)
				toast.error(message)
				return
			}

			setData(data)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			toast.error(error.message)
		}
	}, [id])

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	if (loading) return <Loading />

	const boxes = [
		{ title: 'Currently learning', content: data?.learning ?? msg },
		{ title: 'Skills/Languages', content: data?.skillsAndLanguages ?? msg },
		{ title: 'Currently hacking on', content: data?.hackingOn ?? msg },
	]

	const seo = {
		title: `${data?.name} PROFILE`,
		description:
			data?.bio ??
			'Every article is an opportunity to renew our world ❤️',
	}

	return (
		<>
			<NextSeo {...seo} openGraph={seo} />

			<div className='relative bg-white border rounded-md mt-[60px] pt-[88px] px-7 pb-9'>
				<div className='absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2'>
					<Link href={`/users/${data?.id}`}>
						<Avatar
							src={data?.photoURL as string}
							alt={data?.name}
							sx={{
								width: 120,
								height: 120,
							}}
						/>
					</Link>
				</div>

				{user?.id === data?.id && (
					<div className='absolute top-1 right-1 md:top-7 md:right-7'>
						<Link href='/settings'>
							<Button variant='contained'>Edit profile</Button>
						</Link>
					</div>
				)}

				<div className='flex flex-col items-center justify-center'>
					<div className='text-3xl font-bold'>{data?.name}</div>
					<div className='text-lg text-gray-500'>
						{data?.bio ?? msg}
					</div>

					<div className='flex flex-wrap items-center gap-3 md:gap-7'>
						<div className='flex items-center gap-2'>
							<FaBirthdayCake />

							<span>
								Joined on{' '}
								{moment(data?.createdAt).format('DD/MM/YYYY')}
							</span>
						</div>

						<Link
							href={`mailto:${data?.email}`}
							className={className}>
							<AiOutlineMail />

							<span>{data?.email}</span>
						</Link>

						{data?.website && (
							<Link
								href={data.website}
								target='blank'
								className={className}>
								<AiOutlineLink />

								<span>{data.website}</span>
							</Link>
						)}

						{data?.github && (
							<Link
								href={data.github}
								target='_blank'
								className={className}>
								<AiFillGithub />

								<span>{data.github ?? msg}</span>
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className='grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mt-7 md:gap-7'>
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
							{data?.posts.length} posts published
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<AiOutlineComment />

						<div className='text-sm text-gray-500'>
							{data?.comments.length} comments written
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<AiOutlineLike />

						<div className='text-sm text-gray-500'>
							{data?.likes.length} likes
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserProfile
