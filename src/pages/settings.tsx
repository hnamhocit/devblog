import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Protected from '@/components/Protected'
import { User } from '@/types'
import { validate } from '@/utils/validate'
import axiosClient from './api/axiosClient'

type FormData = {
	email: string
	name: string
	photoURL: string
	website: string
	location: string
	bio: string
	hackingOn: string
	learning: string
	skillsAndLanguages: string
}

const boxClassName = 'flex flex-col gap-5 bg-white rounded-md shadow-md p-7'

const Settings = () => {
	const [user, setUser] = useState<User>()
	const [disabled, setDisabled] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		defaultValues: async () => {
			const rs = await axiosClient.get('/users/me')
			const user = rs.data.data as User

			setUser(user)

			return {
				email: user.email,
				name: user.name,
				photoURL: user.photoURL ?? '',
				website: user.website ?? '',
				location: user.location ?? '',
				bio: user.bio ?? '',
				hackingOn: user.hackingOn ?? '',
				learning: user.learning ?? '',
				skillsAndLanguages: user.skillsAndLanguages ?? '',
			}
		},
	})

	const onSubmit = async (data: FormData) => {
		try {
			setDisabled(true)

			const rs = await axiosClient.patch(`/users/${user?.id}`, data)
			const { success, message } = rs.data

			if (!success) {
				setDisabled(false)
				toast.error(message)
				return
			}

			reset()
			setDisabled(false)
			toast.success(message)
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	const boxes = [
		{
			title: 'User',
			children: (
				<>
					<TextField
						fullWidth
						label='Name'
						error={!!errors.name?.message}
						helperText={errors.name?.message}
						InputLabelProps={{ shrink: true }}
						{...register('name', {
							required: validate.required,
						})}
					/>

					<TextField
						fullWidth
						label='Email'
						error={!!errors.email?.message}
						helperText={errors.email?.message}
						InputLabelProps={{ shrink: true }}
						{...register('email', {
							required: validate.required,
							pattern: validate.email,
						})}
					/>

					<TextField
						fullWidth
						label='Photo URL'
						error={!!errors.photoURL?.message}
						helperText={errors.photoURL?.message}
						InputLabelProps={{ shrink: true }}
						{...register('photoURL', {
							required: validate.required,
							pattern: validate.url,
						})}
					/>
				</>
			),
		},
		{
			title: 'Basic',
			children: (
				<>
					<TextField
						fullWidth
						InputLabelProps={{ shrink: true }}
						{...register('website')}
						label='Website'
					/>

					<TextField
						fullWidth
						InputLabelProps={{ shrink: true }}
						{...register('location')}
						label='Location'
					/>

					<TextField
						fullWidth
						InputLabelProps={{ shrink: true }}
						{...register('bio')}
						label='Bio'
					/>
				</>
			),
		},
		{
			title: 'Coding',
			children: (
				<>
					<TextField
						InputLabelProps={{ shrink: true }}
						{...register('hackingOn')}
						label='Currently hacking on'
						fullWidth
					/>

					<TextField
						InputLabelProps={{ shrink: true }}
						{...register('learning')}
						label='Currently Learning'
						fullWidth
					/>

					<TextField
						InputLabelProps={{ shrink: true }}
						{...register('skillsAndLanguages')}
						label='Skills/Languages'
						fullWidth
					/>
				</>
			),
		},
		{
			children: (
				<Button
					disabled={disabled}
					fullWidth
					variant='contained'
					type='submit'>
					Save profile information
				</Button>
			),
		},
	]

	return (
		<Protected>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-5'>
				{boxes.map((box, i) => (
					<div key={i} className={boxClassName}>
						{box.title && (
							<div className='text-2xl font-bold'>
								{box.title}
							</div>
						)}

						{box.children}
					</div>
				))}
			</form>
		</Protected>
	)
}

export default Settings
