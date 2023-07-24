import { Avatar, Typography } from '@mui/material'
import moment from 'moment'
import { FC, memo, useCallback, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import { Comment } from '@/types'
import CommentComposer from '../CommentComposer'
import MDPreview from '../MDPreview'
import Likes from './Likes'
import Menu from './Menu'

moment.updateLocale('en', {
	relativeTime: {
		future: '%s',
		past: '%s',
		s: 'now',
		ss: '%d s',
		m: '1m',
		mm: '%d m',
		h: '1h',
		hh: '%d h',
		d: '1d',
		dd: '%d d',
		w: '1 week',
		ww: '%d weeks',
		M: '1 month',
		MM: '%d months',
		y: 'a year',
		yy: '%d years',
	},
})

type CommentProps = {
	comment: Comment
	depth: number
	postId: string | undefined
}

const Comment: FC<CommentProps> = ({
	comment: { id, author, updatedAt, content, replies, likes },
	depth,
	postId,
}) => {
	const [isReply, setIsReply] = useState(false)
	const [showReplies, setShowReplies] = useState(false)
	const [isEdit, setIsEdit] = useState(false)

	const toggleIsReply = () => setIsReply(!isReply)
	const toggleShowReplies = () => setShowReplies(!showReplies)
	const toggleIsEdit = useCallback(() => setIsEdit(!isEdit), [isEdit])

	return (
		<div className='flex gap-3'>
			<div className='shrink-0'>
				<Avatar src={author.photoURL ?? ''} alt={author.name} />
			</div>

			<div className='flex-1 w-full'>
				<div className='flex items-center justify-between'>
					<Typography variant='subtitle2'>{author.name}</Typography>

					<Menu id={id} authorId={author.id} onEdit={toggleIsEdit} />
				</div>

				{isEdit ? (
					<CommentComposer commentId={id} _content={content} />
				) : (
					<MDPreview source={content} />
				)}

				<div className='flex flex-col gap-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='text-sm text-gray-500'>
								{moment(updatedAt).fromNow()}
							</div>

							<button
								className='text-sm text-gray-500 transition hover:text-black'
								onClick={toggleIsReply}>
								Reply
							</button>
						</div>

						<Likes id={id} likes={likes} />
					</div>

					{isReply && (
						<CommentComposer postId={postId} parentId={id} />
					)}

					{replies.length > 0 &&
						(showReplies ? (
							<>
								{replies.map((reply) => (
									<Comment
										key={reply.id}
										comment={reply}
										depth={depth + 1}
										postId={postId}
									/>
								))}

								<button
									className='flex items-center gap-1 text-sm text-gray-700 transition hover:text-black'
									onClick={toggleShowReplies}>
									<span>Close</span> <BsChevronUp />
								</button>
							</>
						) : (
							<button
								className='flex items-center gap-1 text-sm text-gray-700 transition hover:text-black'
								onClick={toggleShowReplies}>
								<span>{replies.length} replies</span>
								<BsChevronDown />
							</button>
						))}
				</div>
			</div>
		</div>
	)
}

export default memo(Comment)
