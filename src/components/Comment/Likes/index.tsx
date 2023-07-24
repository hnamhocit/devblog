import { IconButton } from '@mui/material'
import { FC, memo, useMemo, useState } from 'react'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/useAuth'
import axiosClient from '@/pages/api/axiosClient'
import { Like, LikeType } from '@/types'

interface LikesProps {
	id: string
	likes: Like[]
}

const Likes: FC<LikesProps> = ({ id, likes }) => {
	const [disabled, setDisabled] = useState(false)
	const { checkAuth, user } = useAuth()

	const likeExists = likes.find((like) => like.userId === user?.id)

	const { like, dislike } = useMemo(() => {
		const like = likes.filter((like) => like.likeType === 'LIKE').length
		return { like, dislike: likes.length - like }
	}, [likes])

	const handleLike = async (type: string) => {
		if (!checkAuth()) return

		try {
			setDisabled(true)

			if (likeExists) {
				const rs = await axiosClient.patch(`/likes/${likeExists.id}`, {
					commentId: id,
					likeType: type,
					userId: user?.id,
				})

				const { success, message } = rs.data

				if (!success) {
					setDisabled(false)
					toast.error(message)
					return
				}

				return
			}

			const rs = await axiosClient.post('/likes', {
				commentId: id,
				likeType: type,
				userId: user?.id,
			})

			const { success, message } = rs.data

			if (!success) {
				setDisabled(false)
				toast.error(message)
				return
			}

			setDisabled(false)
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	return (
		<div className='flex items-center gap-3'>
			<div className='flex items-center gap-1'>
				<IconButton
					disabled={disabled}
					size='small'
					color={
						likeExists?.likeType === 'LIKE' ? 'success' : undefined
					}
					onClick={() => handleLike(LikeType.LIKE)}>
					<AiFillLike />
				</IconButton>

				<div className='text-sm text-gray-700'>{like}</div>
			</div>

			<div className='flex items-center gap-1'>
				<IconButton
					disabled={disabled}
					size='small'
					color={
						likeExists?.likeType === 'DISLIKE' ? 'error' : undefined
					}
					onClick={() => handleLike(LikeType.DISLIKE)}>
					<AiFillDislike />
				</IconButton>

				<div className='text-sm text-gray-700'>
					{dislike > 0 && dislike}
				</div>
			</div>
		</div>
	)
}

export default memo(Likes)
