import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import Author from '@/components/Author'
import Loading from '@/components/Loading'
import MDPreview from '@/components/MDPreview'
import Tag from '@/components/PostForm/TagComposer/Tag'
import { useAuth } from '@/hooks/useAuth'
import axiosClient from '@/pages/api/axiosClient'
import { Post } from '@/types'
import { extractReplies } from '@/utils/extractReplies'
import AuthorActions from '../components/AuthorActions'
import Footer from '../components/Footer'

const PostDetail = () => {
	const router = useRouter()
	const { slug } = router.query
	const { user } = useAuth()

	const [post, setPost] = useState<Post>()
	const [loading, setLoading] = useState(true)

	const fetchPost = useCallback(async () => {
		try {
			const rs = await axiosClient.get(`/posts/${slug}`)
			const { data, success, message } = rs.data

			if (!success) {
				setLoading(false)
				toast.error(message)
				return
			}

			setPost(data)
			setLoading(false)

			if (user) await axiosClient.patch(`/posts/${slug}/views`)
		} catch (error: any) {
			setLoading(false)
			toast.error('Get post error: ' + error.message)
		}
	}, [slug, user])

	const comments = useMemo(() => {
		if (post?.comments) {
			return extractReplies(post.comments, null)
		}

		return []
	}, [post?.comments])

	const seo = {
		title: post?.title,
		description: "Let's discover now!",
	}

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	if (loading) return <Loading />

	return (
		<>
			<NextSeo
				{...seo}
				openGraph={{
					...seo,
					images: [
						{
							url: post?.thumbnailURL as string,
							width: 1200,
							height: 630,
							alt: post?.title,
						},
					],
				}}
			/>

			<div className='max-w-3xl mx-auto bg-white rounded-md shadow-xl'>
				<div
					className='bg-center bg-no-repeat bg-cover h-60 md:h-[360px] rounded-t-md'
					style={{
						backgroundImage: `url(${post?.thumbnailURL})`,
					}}></div>

				<div className='p-8 border-b md:px-16'>
					<div className='flex items-center justify-between'>
						<Author
							user={post?.author}
							updatedAt={post?.updatedAt}
						/>

						{user?.id === post?.author.id && (
							<AuthorActions slug={slug as string} />
						)}
					</div>

					<div className='mt-5 mb-8'>
						<div className='text-3xl font-black md:text-5xl'>
							{post?.title}
						</div>

						<div className='flex flex-wrap items-center gap-1'>
							{post?.tags.map((tag) => (
								<Tag key={tag.id} tag={tag} size='normal' />
							))}
						</div>
					</div>

					<MDPreview source={post?.content} />
				</div>

				<Footer comments={comments} id={post?.id} />
			</div>
		</>
	)
}

export default PostDetail
