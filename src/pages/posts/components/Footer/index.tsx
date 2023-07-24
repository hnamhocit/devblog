import Link from 'next/link'
import { FC, memo } from 'react'

import Comment from '@/components/Comment'
import CommentComposer from '@/components/CommentComposer'
import { Comment as IComment } from '@/types'

interface FooterProps {
	comments: IComment[] | undefined
	id: string | undefined
}

const Footer: FC<FooterProps> = ({ comments, id }) => {
	return (
		<div className='p-8 md:px-16'>
			<div className='text-2xl font-bold'>
				Comments ({comments?.length}):
			</div>

			<div className='flex flex-col gap-5 my-5'>
				<CommentComposer postId={id} parentId={null} />

				{comments?.map((comment) => (
					<Comment
						key={comment.id}
						depth={0}
						comment={comment}
						postId={id}
					/>
				))}
			</div>

			<div className='flex items-center justify-center gap-3 text-sm text-gray-600'>
				<Link
					href='/code-of-conduct'
					className='transition hover:text-black'>
					Code of conduct
				</Link>

				<div>·</div>

				<Link
					href={`/report-abuse?url=${window.location.href}`}
					className='transition hover:text-black'>
					Report abuse
				</Link>
			</div>
		</div>
	)
}

export default memo(Footer)
