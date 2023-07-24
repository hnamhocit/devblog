import { Avatar, Button } from '@mui/material'
import { FC, memo, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/useAuth'
import axiosClient from '@/pages/api/axiosClient'
import MDEditor from '../MDEditor'

interface CommentComposerProps {
	postId?: string | undefined
	parentId?: string | null
	commentId?: string
	_content?: string
}

const CommentComposer: FC<CommentComposerProps> = ({
	postId,
	parentId,
	commentId,
	_content = '',
}) => {
	const { user, checkAuth } = useAuth()
	const [content, setContent] = useState(_content)
	const [isPreview, setIsPreview] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const sendComment = async () => {
		if (!checkAuth()) return

		try {
			setDisabled(true)

			const requestData = {
				content,
			}

			let rs
			if (!commentId) {
				rs = await axiosClient.post('/comments', {
					...requestData,
					authorId: user?.id,
					postId,
					parentId,
				})
			} else {
				rs = await axiosClient.patch(
					`/comments/${commentId}`,
					requestData
				)
			}

			const { success, message } = rs.data

			if (!success) {
				setDisabled(false)
				toast.error(message)
				return
			}

			setContent('')
			setDisabled(false)
			inputRef.current?.focus()
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	const togglePreview = () => setIsPreview(!isPreview)

	return (
		<div className='flex gap-3'>
			{!commentId && (
				<div className='shrink-0'>
					<Avatar src={user?.photoURL ?? ''} alt={user?.name} />
				</div>
			)}

			<div className='flex-1'>
				<MDEditor value={content} onChange={setContent} />

				{content.trim().length > 0 && (
					<div className='flex items-center gap-3 mt-1'>
						<Button
							disabled={disabled}
							onClick={sendComment}
							variant='contained'>
							Send
						</Button>

						<Button variant='outlined' onClick={togglePreview}>
							{isPreview ? 'Edit' : 'Preview'}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default memo(CommentComposer)
