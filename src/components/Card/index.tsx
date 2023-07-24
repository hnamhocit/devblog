import { Typography } from '@mui/material'
import Link from 'next/link'
import { FC, memo } from 'react'
import { AiFillEye, AiOutlineComment } from 'react-icons/ai'

import { Post } from '@/types'
import { readingTime } from '@/utils/readingTime'
import Author from '../Author'
import Tag from '../PostForm/TagComposer/Tag'

const Card: FC<Post> = ({
	slug,
	title,
	thumbnailURL,
	author,
	content,
	tags,
	updatedAt,
	_count,
	numberOfViews,
}) => {
	const href = `/posts/${slug}`

	return (
		<div className='flex flex-col transition bg-white border rounded-md hover:shadow-xl'>
			<Link
				href={href}
				className='block h-40 transition bg-center bg-no-repeat bg-cover cursor-pointer shrink-0 md:h-60 rounded-t-md'
				style={{
					backgroundImage: `url(${thumbnailURL})`,
				}}></Link>

			<div className='flex flex-col flex-1 h-full p-3'>
				<Author user={author} updatedAt={updatedAt} />

				<div className='my-3'>
					<Typography variant='h6' fontWeight={700}>
						<Link href={href}>{title}</Link>
					</Typography>

					<div className='flex flex-wrap items-center gap-1'>
						{tags.map((tag) => (
							<Tag key={tag.id} tag={tag} />
						))}
					</div>
				</div>

				<div className='flex items-center justify-between mt-auto'>
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-1'>
							<AiFillEye />

							<Typography
								variant='body2'
								className='text-gray-500'>
								{numberOfViews} views
							</Typography>
						</div>

						<div className='flex items-center gap-1'>
							<AiOutlineComment />

							<Typography
								variant='body2'
								className='text-gray-500'>
								{_count?.comments} comments
							</Typography>
						</div>
					</div>

					<Typography variant='body2' className='text-gray-500'>
						{readingTime(content)}
					</Typography>
				</div>
			</div>
		</div>
	)
}

export default memo(Card)
