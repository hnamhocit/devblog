import { Button, TextareaAutosize } from '@mui/material'
import { FC, memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import slugify from 'slugify'

import { useAuth } from '@/hooks/useAuth'
import axiosClient from '@/pages/api/axiosClient'
import { TagInput } from '@/types/tagInput'
import { validate } from '@/utils/validate'
import MDEditor from '../MDEditor'
import TagComposer from './TagComposer'

type FormData = {
	thumbnailURL: string
	title: string
}

interface PostFormProps {
	slug?: string
	defaultValues?: FormData
	_content?: string
	_tagInputs?: TagInput[]
}

const PostForm: FC<PostFormProps> = ({
	slug,
	defaultValues,
	_content = '',
	_tagInputs = [],
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({ defaultValues })
	const [disabled, setDisabled] = useState(false)
	const [tagInputs, setTagInputs] = useState<TagInput[]>(_tagInputs)
	const [content, setContent] = useState(_content)
	const { user } = useAuth()

	const onSubmit = async (data: FormData) => {
		if (tagInputs.length === 0) {
			toast.error('Tags are required!')
			return
		} else if (content.length < 10) {
			toast.error('Content is required!')
			return
		}

		try {
			setDisabled(true)

			let rs

			const _slug = slugify(data.title, {
				lower: true,
				strict: true,
				locale: 'vi',
			})

			const requestData = {
				...data,
				content,
				tags: tagInputs,
				slug: _slug,
				authorId: user?.id,
			}

			if (!slug) {
				rs = await axiosClient.post('/posts', requestData)
			} else {
				rs = await axiosClient.patch(`/posts/${slug}`, requestData)
			}

			const result = rs.data

			if (!result.success) {
				toast.error(result.message)
				setDisabled(false)
				return
			}

			setContent('')
			setTagInputs([])
			setDisabled(false)
			reset({ thumbnailURL: '', title: '' })
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	return (
		<div className='max-w-3xl mx-auto bg-white rounded-md shadow-xl'>
			<form
				className='flex flex-col px-16 py-8 gap-7'
				onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						type='text'
						className='block w-full outline-none'
						placeholder='Thumbnail URL'
						{...register('thumbnailURL', {
							required: validate.required,
							pattern: validate.url,
						})}
					/>

					<span className='text-xs text-red-600'>
						{errors.thumbnailURL?.message}
					</span>
				</div>

				<div>
					<TextareaAutosize
						className='block w-full text-5xl font-black outline-none resize-none'
						placeholder='Title'
						spellCheck={false}
						{...register('title', {
							required: validate.required,
						})}
					/>

					<span className='text-xs text-red-600'>
						{errors.title?.message}
					</span>
				</div>

				<TagComposer tagInputs={tagInputs} onChange={setTagInputs} />
				<MDEditor value={content} onChange={setContent} />

				<Button type='submit' disabled={disabled} variant='contained'>
					Continue
				</Button>
			</form>
		</div>
	)
}

export default memo(PostForm)
