import { Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setUser } from '@/store/reducers/userSlice'
import { setTokens } from '@/utils/jwt'
import { validate } from '@/utils/validate'
import axiosClient from './api/axiosClient'

const FormLink = styled(Link)`
	color: #3b82f6;

	&:hover {
		text-decoration: underline;
	}
`

type FormData = {
	email: string
	name: string
	password: string
}

const Enter = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { state } = router.query
	const isSignUp = state === 'new-user'

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()
	const [disabled, setDisabled] = useState(false)

	const onSubmit = async (data: FormData) => {
		try {
			setDisabled(true)

			let rs

			if (isSignUp) {
				rs = await axiosClient.post('/auth/signup', data)
			} else {
				rs = await axiosClient.post('/auth/signin', data)
			}

			const result = rs.data

			if (!result.success) {
				setDisabled(false)
				toast.error(result.message)
				return
			}

			const { accessToken, refreshToken } = result.data
			setTokens(accessToken, refreshToken)

			const meRs = await axiosClient.get('/users/me')
			const meResult = meRs.data

			if (!meResult.success) {
				setDisabled(false)
				toast.error(meResult.message)
				return
			}

			reset()
			setDisabled(false)
			dispatch(setUser(meResult.data))
			router.push('/')
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	return (
		<div className='flex flex-col w-full max-w-lg gap-5 p-12 mx-auto bg-white border rounded-md'>
			<div className='text-center'>
				<Typography variant='h4' fontWeight={700}>
					Welcome to Dev Blog
				</Typography>

				<div className='text-sm text-gray-500'>
					Every article is an opportunity to renew our world 🥰
				</div>
			</div>

			<form
				className='flex flex-col gap-5'
				onSubmit={handleSubmit(onSubmit)}>
				{isSignUp && (
					<TextField
						label='Name'
						error={!!errors.name?.message}
						helperText={errors.name?.message}
						{...register('name', {
							required: validate.required,
							minLength: validate.min(5),
							maxLength: validate.max(25),
						})}
					/>
				)}

				<TextField
					type='email'
					label='Email'
					error={!!errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', {
						required: validate.required,
						pattern: validate.email,
					})}
				/>

				<TextField
					type='password'
					label='Password'
					error={!!errors.password?.message}
					helperText={errors.password?.message}
					{...register('password', {
						required: validate.required,
						pattern: validate.password,
					})}
				/>

				<Button
					disabled={disabled}
					type='submit'
					fullWidth
					variant='contained'>
					Continue
				</Button>
			</form>

			<div className='text-center'>
				{isSignUp ? (
					<div>
						Already have an account?{' '}
						<FormLink href='/enter' className='text-blue-500'>
							Login
						</FormLink>
					</div>
				) : (
					<div>
						Don&apos;t have an account?{' '}
						<FormLink
							href='/enter?state=new-user'
							className='text-blue-500'>
							Sign up
						</FormLink>
					</div>
				)}
			</div>
		</div>
	)
}

export default Enter
