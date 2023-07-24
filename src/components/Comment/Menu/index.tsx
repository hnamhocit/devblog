import { Button } from '@mui/material'
import Link from 'next/link'
import { FC, memo, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { toast } from 'react-toastify'

import BasicMenu from '@/components/BasicMenu'
import { useAuth } from '@/hooks/useAuth'
import axiosClient from '@/pages/api/axiosClient'

interface MenuProps {
	id: string
	authorId: string
	onEdit: () => void
}

const Menu: FC<MenuProps> = ({ id, authorId, onEdit }) => {
	const { user } = useAuth()
	const [disabled, setDisabled] = useState(false)

	const handleCopyLink = () =>
		navigator.clipboard.writeText(window.location.href)

	const handleDelete = async () => {
		try {
			setDisabled(true)

			const rs = await axiosClient.delete(`/comments/${id}`)
			const { success, message } = rs.data

			if (!success) {
				setDisabled(false)
				toast.error(message)
				return
			}

			setDisabled(false)
		} catch (error: any) {
			setDisabled(false)
			toast.error(error.message)
		}
	}

	return (
		<BasicMenu btnIcon={<BsThreeDots />} btnSize='small'>
			<Button fullWidth color='inherit' onClick={handleCopyLink}>
				Copy link
			</Button>

			<Link href={`/report-abuse?url=${window.location.href}`}>
				<Button fullWidth color='inherit'>
					Report abuse
				</Button>
			</Link>

			{authorId === user?.id && (
				<>
					<Button fullWidth onClick={onEdit}>
						Edit
					</Button>

					<Button
						disabled={disabled}
						fullWidth
						color='error'
						onClick={handleDelete}>
						Delete
					</Button>
				</>
			)}
		</BasicMenu>
	)
}

export default memo(Menu)
