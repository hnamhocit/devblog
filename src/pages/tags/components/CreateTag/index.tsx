import { Button, IconButton, TextField, TextareaAutosize } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { toast } from 'react-toastify'

import axiosClient from '@/pages/api/axiosClient'
import { validate } from '@/utils/validate'

type FormData = {
	name: string
	color: string
	description: string
	photoURL: string
}

const CreateTag = () => {
	const [isCreate, setIsCreate] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const {
		reset,
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm<FormData>()

	const toggleIsCreate = () => setIsCreate(!isCreate)

	const onSubmit = async (data: FormData) => {
		try {
			setDisabled(true)
			const res = await axiosClient.post('/tags', data)
			const result = res.data

			if (!result.success) {
				setDisabled(false)
				toast.error(result.message)
				return
			}

			reset()
			setDisabled(false)
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	return (
		<div
			className={clsx(
				'transition bg-white border rounded-md shadow-md hover:shadow-lg',
				{
					'flex items-center justify-center cursor-pointer':
						!isCreate,
				}
			)}>
			<div
				className='h-3 border-b rounded-t-md'
				style={{ backgroundColor: watch('color') }}></div>

			{isCreate ? (
				<form
					className='flex flex-col gap-3 p-3'
					onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label='Name'
						error={!!errors.name?.message}
						helperText={errors.name?.message}
						{...register('name', {
							required: validate.required,
							minLength: validate.min(2),
							pattern: validate.lowercase,
						})}
					/>

					<TextField
						label='PhotoURL'
						error={!!errors.photoURL?.message}
						helperText={errors.photoURL?.message}
						{...register('photoURL', {
							required: validate.required,
							pattern: validate.url,
						})}
					/>

					<TextField
						label='Tag color'
						error={!!errors.color?.message}
						helperText={errors.color?.message}
						{...register('color', {
							required: validate.required,
							pattern: validate.hexColor,
						})}
					/>

					<div>
						<TextareaAutosize
							className={clsx(
								'block w-full p-2 border rounded-md outline-none resize-none',
								{
									'text-red-600 border-red-600':
										!!errors.description?.message,
								}
							)}
							minRows={3}
							placeholder='Description'
							spellCheck={false}
							{...register('description', {
								required: validate.required,
							})}
						/>

						<div className='pt-1 pl-3 text-xs text-red-600'>
							{errors.description?.message}
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Button
							disabled={disabled}
							type='submit'
							variant='contained'
							fullWidth>
							Create
						</Button>

						<Button
							type='button'
							onClick={toggleIsCreate}
							variant='outlined'
							color='error'
							fullWidth>
							Cancel
						</Button>
					</div>
				</form>
			) : (
				<IconButton onClick={toggleIsCreate}>
					<IoMdAdd size={30} />
				</IconButton>
			)}
		</div>
	)
}

export default CreateTag
