import { IconButton } from '@mui/material'
import { Dispatch, FC, SetStateAction, memo, useEffect, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { toast } from 'react-toastify'

import Loading from '@/components/Loading'
import Tag from '@/components/PostForm/TagComposer/Tag'
import axiosClient from '@/pages/api/axiosClient'
import { Tag as ITag } from '@/types/tag'
import { TagInput } from '@/types/tagInput'
import AutocompleteTag from '../AutoCompleteTag'

interface TagComposerProps {
	tagInputs: TagInput[]
	onChange: Dispatch<SetStateAction<TagInput[]>>
}

const TagComposer: FC<TagComposerProps> = ({ tagInputs, onChange }) => {
	const [tags, setTags] = useState<ITag[]>([])
	const [loading, setLoading] = useState(false)

	const fetchTags = async () => {
		try {
			const rs = await axiosClient.get('/tags')
			const { data, success, message } = rs.data

			if (!success) {
				setLoading(false)
				toast.error(message)
				return
			}

			setTags(data)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			toast.error(error.message)
		}
	}

	const handleRemove = (name: string) => {
		const newTags = tagInputs.filter((tag: TagInput) => tag.name !== name)
		onChange(newTags)
	}

	useEffect(() => {
		fetchTags()
	}, [])

	if (loading) return <Loading />

	return (
		<div className='flex flex-wrap items-center gap-3'>
			{tagInputs.map((tagInput) => (
				<div key={tagInput.name} className='flex items-center gap-1'>
					<Tag tag={tagInput} size='normal' />

					<IconButton
						size='small'
						color='error'
						onClick={() => handleRemove(tagInput.name)}>
						<IoIosCloseCircle />
					</IconButton>
				</div>
			))}

			{tagInputs.length <= 3 && (
				<AutocompleteTag
					tags={tags}
					tagInputs={tagInputs}
					onChange={onChange}
				/>
			)}
		</div>
	)
}

export default memo(TagComposer)
