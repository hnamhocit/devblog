import { Typography } from '@mui/material'
import Link from 'next/link'
import { FC, memo } from 'react'

import { Tag } from '@/types/tag'

const Tag: FC<Tag> = ({ name, color, description, photoURL, _count }) => {
	return (
		<Link
			href={`/tags/${name}`}
			className='block transition bg-white rounded-md shadow-md hover:shadow-lg'>
			<div
				className='h-3 rounded-t-md'
				style={{
					backgroundColor: color,
				}}></div>

			<div className='relative p-3'>
				<Typography
					gutterBottom
					className='uppercase'
					fontWeight={700}
					variant='h6'
					color={color}>
					{name}
				</Typography>

				<Typography className='text-gray-500 line-clamp-4' gutterBottom>
					{description}
				</Typography>

				<Typography className='text-sm text-gray-500' gutterBottom>
					{_count?.posts} posts published
				</Typography>

				<div
					className='absolute w-12 h-12 bg-center bg-no-repeat bg-contain bottom-1 right-1'
					style={{
						backgroundImage: `url(${photoURL})`,
					}}></div>
			</div>
		</Link>
	)
}

export default memo(Tag)
