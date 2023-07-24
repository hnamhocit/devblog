import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

import { Tag as ITag } from '@/types/tag'
import { TagInput } from '@/types/tagInput'
import { randomHexColor } from '@/utils/color'

interface AutocompleteTagProps {
	tags: ITag[]
	tagInputs: TagInput[]
	onChange: Dispatch<SetStateAction<TagInput[]>>
}

const AutocompleteTag: FC<AutocompleteTagProps> = ({
	tags,
	tagInputs,
	onChange,
}) => {
	const [tag, setTag] = useState({ name: '', color: '' })
	const [isFocus, setIsFocus] = useState(false)
	const eleRef = useRef<HTMLDivElement>(null)

	const existingTag = useMemo(
		() => tags.find(({ name }) => name === tag.name),
		[tag.name, tags]
	)

	const filteredTags = useMemo(
		() =>
			tags.filter(
				({ name }) =>
					!tagInputs.find((tagInput) => tagInput.name === name) &&
					name.includes(tag.name)
			),
		[tag.name, tagInputs, tags]
	)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.startsWith(' ')) return
		setTag({ ...tag, name: e.target.value })
	}

	const reset = () => setTag({ name: '', color: '' })

	const handleSubmit = () => {
		let newTag: TagInput = tag

		if (existingTag) newTag = existingTag
		else if (newTag.color === '')
			newTag = { ...tag, color: randomHexColor() }

		onChange([...tagInputs, newTag])
		reset()
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				eleRef.current &&
				!eleRef.current.contains(event.target as Node)
			) {
				setIsFocus(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='relative'>
			<div
				className='flex items-center gap-1 pb-2 transition border-b-2'
				style={{ borderColor: existingTag?.color }}>
				<input
					type='text'
					className='block outline-none'
					placeholder='tagname'
					onFocus={() => setIsFocus(true)}
					value={tag.name}
					onChange={handleChange}
				/>

				<button
					onClick={reset}
					type='button'
					className='block text-red-600 transition hover:text-red-700'>
					<AiFillCloseCircle size={20} />
				</button>

				<button
					onClick={handleSubmit}
					type='button'
					className='block text-blue-600 transition hover:text-blue-700'>
					<AiFillCheckCircle size={20} />
				</button>
			</div>

			<div
				ref={eleRef}
				className='absolute left-0 right-0 z-10 flex flex-wrap items-center gap-3 p-3 transition translate-y-2 bg-white border rounded-md top-full max-h-[400px] overflow-y-scroll'
				style={{
					visibility: isFocus ? 'visible' : 'hidden',
					opacity: isFocus ? 1 : 0,
				}}>
				{filteredTags.length > 0 ? (
					filteredTags.map(({ id, name, color }) => (
						<button
							type='button'
							key={id}
							className='block px-2 py-1 transition rounded-md hover:bg-gray-100'
							onClick={() => setTag({ name, color })}>
							<span style={{ color }}>#</span> {name}
						</button>
					))
				) : (
					<span className='text-xs text-gray-500'>
						Can&apos;t find the tag, don&apos;t worry we will create
						a new one!
					</span>
				)}
			</div>
		</div>
	)
}

export default memo(AutocompleteTag)
