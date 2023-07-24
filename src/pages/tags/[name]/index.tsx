import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Loading from '@/components/Loading'
import PostContainer from '@/components/PostContainer'
import axiosClient from '@/pages/api/axiosClient'
import { Tag } from '@/types/tag'

const TagDetail = () => {
	const router = useRouter()
	const { name } = router.query
	const [loading, setLoading] = useState(true)
	const [tag, setTag] = useState<Tag>()

	const fetchTag = useCallback(async () => {
		try {
			const rs = await axiosClient.get(`/tags/${name}`)
			const { data, success, message } = rs.data

			if (!success) {
				setLoading(false)
				toast.error(message)
				return
			}

			setTag(data)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			toast.error(error.message)
		}
	}, [name])

	useEffect(() => {
		fetchTag()
	}, [fetchTag])

	if (loading) return <Loading />

	return <PostContainer data={tag?.posts} />
}

export default TagDetail
