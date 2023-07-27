import {
	Button,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	TextareaAutosize,
	Typography,
} from '@mui/material'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { validate } from '@/utils/validate'
import { useRouter } from 'next/router'
import axiosClient from './api/axiosClient'

type FormData = {
	url: string
	message: string
	option: string
}

const ReportAbuse = () => {
	const router = useRouter()
	const url = router.query.url ?? window.location.href
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<FormData>({ defaultValues: { option: '', url: url as string } })
	const [loading, setLoading] = useState(false)
	const captchaRef = useRef<ReCAPTCHA>(null)

	const onSubmit = async (data: FormData) => {
		const token = captchaRef.current?.getValue()
		captchaRef.current?.reset()

		if (token?.length === 0) {
			toast.error('Please confirm you are not a robot!')
			return
		}

		try {
			setLoading(true)

			const res = await axiosClient.post('/reports', { ...data, token })
			const result = res.data

			if (!result.success) {
				setLoading(false)
				toast.error(result.success)
				return
			}

			reset()
			setLoading(false)
			toast.success('Thank you for the report ❤️!')
		} catch (error: any) {
			setLoading(false)
			toast.error(error.message)
		}
	}

	const seo = {
		title: 'REPORT ABUSE',
		description:
			'We continue to try to make this environment a great one for everybody.',
	}

	return (
		<>
			<NextSeo {...seo} openGraph={seo} />

			<div className='flex flex-col w-full max-w-lg gap-5 p-12 mx-auto bg-white border rounded-md'>
				<div>
					<Typography variant='h4' fontWeight={700}>
						Report abuse
					</Typography>

					<div>
						Thank you for reporting any abuse that violates our{' '}
						<Link
							href='/code-of-conduct'
							className='font-medium text-blue-600'>
							code of conduct
						</Link>
						{' or '}
						<Link
							href='/terms'
							className='font-medium text-blue-600'>
							terms and conditions
						</Link>
						. We continue to try to make this environment a great
						one for everybody.
					</div>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-6 p-6 border rounded-md'>
					<Controller
						rules={{
							required: validate.required,
						}}
						control={control}
						name='option'
						render={({ field }) => (
							<RadioGroup {...field}>
								<FormControlLabel
									value='rude-or-vulgar'
									control={<Radio />}
									label='Rude or vulgar'
								/>

								<FormControlLabel
									value='harassment-or-hate-speech'
									control={<Radio />}
									label='Harassment or hate speech'
								/>

								<FormControlLabel
									value='spam-or-copyright-issue'
									control={<Radio />}
									label='Spam or copyright issue'
								/>

								<FormControlLabel
									value='inappropriate-listings-message/category'
									control={<Radio />}
									label='Inappropriate listings message/category'
								/>

								<FormControlLabel
									value='other'
									control={<Radio />}
									label='Other'
								/>

								<span className='text-xs text-red-600'>
									{errors.option?.message}
								</span>
							</RadioGroup>
						)}
					/>

					<TextField
						fullWidth
						label='Reported URL'
						error={!!errors.url?.message}
						helperText={errors.url?.message}
						{...register('url', {
							required: validate.required,
							pattern: validate.url,
						})}
					/>

					<div>
						<div className='mb-3'>
							<Typography variant='subtitle1'>Message</Typography>
							<Typography variant='caption'>
								Please provide any additional information or
								context that will help us understand and handle
								the situation.
							</Typography>
						</div>

						<TextareaAutosize
							minRows={3}
							placeholder='...'
							className='block w-full h-full p-3 border-2 rounded-md outline-none resize-none'
							maxLength={600}
							{...register('message')}
						/>
					</div>

					<ReCAPTCHA
						ref={captchaRef}
						sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string}
					/>

					<Button
						disabled={loading}
						type='submit'
						variant='contained'>
						Send feed back
					</Button>
				</form>
			</div>
		</>
	)
}

export default ReportAbuse
