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

	return <PostContainer data={data} />
}
