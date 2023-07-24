import { Button, IconButton, Tooltip } from '@mui/material'
import { FC, memo, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'

import BasicMenu from '@/components/BasicMenu'
import axiosClient from '@/pages/api/axiosClient'
import Link from 'next/link'
import { toast } from 'react-toastify'

interface AuthorActionsProps {
	slug: string
}

const AuthorActions: FC<AuthorActionsProps> = ({ slug }) => {
	const [disabled, setDisabled] = useState(false)

	const handleDelete = async () => {
		try {
			setDisabled(true)
			const response = await axiosClient.delete(`/posts/${slug}`)
			const result = response.data

			if (!result.success) {
				toast.error(result.message)
				setDisabled(false)
				return
			}

			setDisabled(false)
			toast.success(result.message)
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	return (
		<BasicMenu btnIcon={<BsThreeDots />}>
			<div className='flex items-center justify-center gap-1'>
				<div className='text-lg text-gray-500 select-none'>
					Author actions
				</div>

				<Tooltip title='Tips: you can perform these actions in profile > my posts'>
					<IconButton color='primary' size='small'>
						<AiOutlineInfoCircle />
					</IconButton>
				</Tooltip>
			</div>

			<Link href={`/posts/${slug}/edit`}>
				<Button fullWidth>Edit</Button>
			</Link>

			<Button
				onClick={handleDelete}
				disabled={disabled}
				fullWidth
				color='error'>
				Delete
			</Button>
		</BasicMenu>
	)
}

export default memo(AuthorActions)
