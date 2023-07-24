import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Loading from '@/components/Loading'
import PostForm from '@/components/PostForm'
import Protected from '@/components/Protected'
import { useAuth } from '@/hooks/useAuth'
import axiosClient from '@/pages/api/axiosClient'
import { Post } from '@/types'

const EditPost = () => {
	const router = useRouter()
	const { slug } = router.query
	const { user } = useAuth()

	const [loading, setLoading] = useState(true)
	const [post, setPost] = useState<Post>()

	const fetchPost = useCallback(async () => {
		try {
			const response = await axiosClient.get(`/posts/${slug}`)
			const result = response.data

			if (!result.success) {
				handleError(result.message)
				return
			} else if (user?.id !== result.data.author?.id) {
				handleError('Only the author can access this page!')
				router.push('/')
			}

			setLoading(false)
			setPost(result.data)
		} catch (error: any) {
			handleError(error.message)
		}
	}, [slug, router, user?.id])

	const handleError = (message: any) => {
		setLoading(false)
		toast.error(message)
	}

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	if (loading) return <Loading />

	return (
		<Protected>
			<PostForm
				slug={slug as string}
				_content={post?.content}
				_tagInputs={post?.tags.map((tag) => ({
					name: tag.name,
					color: tag.color,
				}))}
				defaultValues={{
					title: post?.title as string,
					thumbnailURL: post?.thumbnailURL as string,
				}}
			/>
		</Protected>
	)
}

export default EditPost
