import { Pagination } from '@mui/material'
import { ChangeEvent, FC, memo, useState } from 'react'

import { Post } from '@/types'
import Card from '../Card'

interface PostContainerProps {
	data: Post[] | undefined
}

const PostContainer: FC<PostContainerProps> = ({ data = [] }) => {
	const [page, setPage] = useState(1)

	const handleChange = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	return (
		<div>
			<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
				{data.slice(page - 1 * 10, page * 10).map((post) => (
					<Card key={post.id} {...post} />
				))}
			</div>

			<div className='mt-5'>
				<Pagination
					count={Math.ceil(data.length / 10)}
					page={page}
					onChange={handleChange}
					className='justify-center'
				/>
			</div>
		</div>
	)
}

export default memo(PostContainer)
