import clsx from 'clsx'
import {
	ChangeEvent,
	useCallback,
	useDeferredValue,
	useEffect,
	useRef,
	useState,
} from 'react'
import { BsSearch } from 'react-icons/bs'
import { toast } from 'react-toastify'

import axiosClient from '@/pages/api/axiosClient'
import { Post } from '@/types'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'

const Search = () => {
	const [q, setQ] = useState('')
	const [isFocus, setIsFocus] = useState(false)
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const query = useDeferredValue(q)
	const menuRef = useRef<HTMLDivElement>(null)

	const toggleIsFocus = () => setIsFocus(!isFocus)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		if (val.startsWith(' ')) return
		setQ(val)
	}

	const reset = () => {
		setQ('')
		setPosts([])
		setIsFocus(false)
	}

	const fetchData = useCallback(async () => {
		try {
			setLoading(true)

			const rs = await axiosClient.post(`/posts/search/${query}`)
			const { data, success, message } = rs.data

			if (!success) {
				setLoading(false)
				toast.error(message)
				return
			}

			setLoading(false)
			setPosts(data)
		} catch (error: any) {
			setLoading(false)
			toast.error(error.message)
		}
	}, [query])

	useEffect(() => {
		if (query.length >= 3) {
			fetchData()
		}
	}, [query, fetchData])

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node))
				reset()
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [])

	return (
		<div className='relative'>
			<div
				className={clsx(
					'flex items-center gap-3 px-3 py-2 border-2 rounded-xl transition',
					{
						'border-blue-500': isFocus,
					}
				)}>
				<input
					type='text'
					className='flex-1 block w-full bg-transparent outline-none'
					placeholder='Search here...'
					value={q}
					onChange={handleChange}
					onFocus={toggleIsFocus}
				/>

				<BsSearch />
			</div>

			<div
				className='absolute left-0 w-full overflow-hidden transition-all translate-y-2 top-full'
				style={{
					visibility: isFocus ? 'visible' : 'hidden',
					opacity: isFocus ? 1 : 0,
				}}
				ref={menuRef}>
				<div className='flex flex-col gap-3 p-3 max-w-full bg-white border shadow-lg rounded-xl max-h-[240px] overflow-y-scroll'>
					<div className='flex flex-wrap items-center justify-between text-sm text-gray-500'>
						<div>
							Search:{' '}
							<span className='font-medium text-gray-800 break-words'>
								&quot;{query.substring(0, 17)}
								{query.length > 17 && '...'}&quot;
							</span>
						</div>

						<div>
							{loading ? (
								<CircularProgress size={20} />
							) : (
								posts.length + ' results'
							)}
						</div>
					</div>

					{posts.map((post) => (
						<Link
							key={post.id}
							href={`/posts/${post.slug}`}
							className='block text-xs font-medium text-gray-500 transition hover:text-black'
							onClick={reset}>
							{post.title} ({post.numberOfViews} views)
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Search
