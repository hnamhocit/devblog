import { ChangeEvent, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Loading from '@/components/Loading'
import { selectUser } from '@/store/reducers/userSlice'
import { Tag as ITag } from '@/types/tag'
import axiosClient from '../api/axiosClient'
import CreateTag from './components/CreateTag'
import Tag from './components/Tag'

const Tags = () => {
	const [tags, setTags] = useState<ITag[]>([])
	const [loading, setLoading] = useState(false)
	const [q, setQ] = useState('')
	const user = useSelector(selectUser)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		if (val.startsWith(' ')) return
		setQ(val)
	}

	const fetchTags = async () => {
		try {
			setLoading(true)
			const res = await axiosClient.get('/tags')
			const result = res.data

			if (!result.success) {
				setLoading(false)
				toast.error(result.message)
				return
			}

			setLoading(false)
			setTags(result.data)
		} catch (error: any) {
			setLoading(false)
			toast.error(error.message)
		}
	}

	useEffect(() => {
		fetchTags()
	}, [])

	if (loading) return <Loading />

	return (
		<div>
			<div className='flex items-center justify-between mb-5'>
				<div className='text-xl font-bold md:text-3xl'>Top tags</div>

				<div className='flex items-center gap-3 px-3 py-2 bg-white border rounded-md'>
					<input
						type='text'
						className='flex-1 block w-full h-full bg-transparent outline-none'
						placeholder='Search for tags'
						value={q}
						onChange={handleChange}
					/>

					<BsSearch />
				</div>
			</div>

			<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
				{tags
					.filter((tag) =>
						tag.name.includes(q.toLocaleLowerCase().trim())
					)
					.map((tag) => (
						<Tag key={tag.id} {...tag} />
					))}

				{user?.role === 'ADMIN' && <CreateTag />}
			</div>
		</div>
	)
}

export default Tags
