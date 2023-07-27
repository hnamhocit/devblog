import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'

import Loading from '@/components/Loading'
import PostContainer from '@/components/PostContainer'
import { Post } from '@/types'
import axiosClient from './api/axiosClient'

export default function Home() {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<Post[]>([])

	const fetchPosts = async () => {
		const res = await axiosClient.get('/posts')
		setData(res.data.data)
		setLoading(false)
	}

	useEffect(() => {
		fetchPosts()
	}, [loading])

	if (loading) return <Loading />

	return (
		<>
			<NextSeo
				openGraph={{
					images: [
						{
							url: 'https://devblog-2xmv.onrender.com/android-chrome-192x192.png',
							width: 192,
							height: 192,
						},
						{
							url: 'https://devblog-2xmv.onrender.com/android-chrome-512x512.png',
							width: 512,
							height: 512,
						},
						{
							url: 'https://devblog-2xmv.onrender.com/apple-touch-icon.png',
							width: 180,
							height: 180,
						},
						{
							url: 'https://devblog-2xmv.onrender.com/favicon-32x32.png',
							width: 32,
							height: 32,
						},
						{
							url: 'https://devblog-2xmv.onrender.com/favicon-16x16.png',
							width: 16,
							height: 16,
						},
					],
				}}
			/>

			<PostContainer data={data} />
		</>
	)
}
