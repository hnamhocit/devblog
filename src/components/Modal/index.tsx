import { Modal } from '@mui/material'
import { FC, ReactNode, memo } from 'react'

export interface ModalProps {
	open: boolean
	onClose: () => void
	children?: ReactNode
	keepMounted?: boolean
}

const ModalContainer: FC<ModalProps> = ({
	children,
	open,
	onClose,
	keepMounted = false,
}) => {
	return (
		<Modal open={open} onClose={onClose} keepMounted={keepMounted}>
			<div className='absolute w-full max-w-md p-6 -translate-x-1/2 -translate-y-1/2 bg-white border shadow-xl rounded-xl top-1/2 left-1/2'>
				{children}
			</div>
		</Modal>
	)
}

export default memo(ModalContainer)
